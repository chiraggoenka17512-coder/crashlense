import os
import numpy as np
from PIL import Image, ImageFilter
from collections import deque

def isolate_clean_object(input_path, output_path, bg_diff_thresh=18, is_eraser=False):
    img = Image.open(input_path).convert("RGB")
    w, h = img.size
    arr = np.array(img, dtype=np.float32)
    
    # Estimate background color from outer border (10 pixels border)
    border_pixels = np.concatenate([
        arr[:10, :, :].reshape(-1, 3),
        arr[-10:, :, :].reshape(-1, 3),
        arr[:, :10, :].reshape(-1, 3),
        arr[:, -10:, :].reshape(-1, 3)
    ], axis=0)
    bg_color = np.median(border_pixels, axis=0)
    print(f"File {os.path.basename(input_path)} estimated bg: {bg_color}")
    
    # Distance of each pixel to estimated background color
    diff = np.linalg.norm(arr - bg_color, axis=-1)
    
    # For flood fill: starting from all border pixels
    # A pixel is background if it's connected to border and diff < bg_diff_thresh
    visited = np.zeros((h, w), dtype=bool)
    queue = deque()
    
    for x in range(w):
        queue.append((0, x))
        queue.append((h - 1, x))
        visited[0, x] = True
        visited[h - 1, x] = True
    for y in range(h):
        queue.append((y, 0))
        queue.append((y, w - 1))
        visited[y, 0] = True
        visited[y, w - 1] = True
        
    # BFS flood fill
    # A pixel is considered background if its diff to local background is small
    while queue:
        cy, cx = queue.popleft()
        
        for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
                # If difference from background color is within threshold, it's background
                # Also check saturation / brightness
                d = diff[ny, nx]
                if d < bg_diff_thresh:
                    visited[ny, nx] = True
                    queue.append((ny, nx))
    
    # visited is the background mask!
    # Foreground mask is ~visited
    fg_mask = ~visited
    
    # Smooth the mask edge slightly (anti-aliasing)
    mask_img = Image.fromarray((fg_mask * 255).astype(np.uint8), mode="L")
    mask_blurred = mask_img.filter(ImageFilter.GaussianBlur(radius=0.8))
    
    # Convert back to array
    alpha = np.array(mask_blurred, dtype=np.uint8)
    
    # Create RGBA image
    rgba = np.dstack([np.array(img), alpha])
    result = Image.fromarray(rgba, mode="RGBA")
    
    # Crop to bounding box with small padding
    bbox = result.getbbox()
    if bbox:
        x0, y0, x1, y1 = bbox
        pad = 8
        crop_box = (
            max(0, x0 - pad),
            max(0, y0 - pad),
            min(w, x1 + pad),
            min(h, y1 + pad)
        )
        result = result.crop(crop_box)
        
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    result.save(output_path, "PNG")
    print(f"Saved: {output_path} | Size: {result.size}")

items = [
    (
        r"C:\Users\Chirag\.gemini\antigravity-ide\brain\8f36ea6a-43a4-4e27-afb0-704a158f4ecb\olfa_knife_cozy_1792833818306.jpg",
        r"public\images\olfa_knife_cozy.png",
        22,
        False
    ),
    (
        r"C:\Users\Chirag\.gemini\antigravity-ide\brain\8f36ea6a-43a4-4e27-afb0-704a158f4ecb\drafting_pen_cozy_1792833844507.jpg",
        r"public\images\drafting_pen_cozy.png",
        18,
        False
    ),
    (
        r"C:\Users\Chirag\.gemini\antigravity-ide\brain\8f36ea6a-43a4-4e27-afb0-704a158f4ecb\paper_clips_cozy_1792833870366.jpg",
        r"public\images\paper_clips_cozy.png",
        20,
        False
    ),
    (
        r"C:\Users\Chirag\.gemini\antigravity-ide\brain\8f36ea6a-43a4-4e27-afb0-704a158f4ecb\eraser_block_cozy_1792833905890.jpg",
        r"public\images\eraser_block_cozy.png",
        15,
        True
    ),
]

for src, dst, thresh, is_er in items:
    isolate_clean_object(src, dst, bg_diff_thresh=thresh, is_eraser=is_er)
