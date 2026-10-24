import os
import numpy as np
from PIL import Image

def isolate_white_bg(input_path, output_path, crop_padding=20):
    img = Image.open(input_path).convert("RGBA")
    arr = np.array(img, dtype=np.float32)
    
    r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]
    
    # Measure whiteness: distance from pure white (255, 255, 255)
    # Whiteness index where 1.0 is pure white
    min_rgb = np.minimum(np.minimum(r, g), b)
    max_rgb = np.maximum(np.maximum(r, g), b)
    saturation = (max_rgb - min_rgb) / (max_rgb + 1e-5)
    brightness = (r + g + b) / (3.0 * 255.0)
    
    # Calculate alpha:
    # If high brightness and very low saturation -> it's background or shadow
    # Pure white (> 0.98 brightness, < 0.03 saturation) -> alpha = 0
    # Soft shadow (0.7 to 0.98 brightness, low saturation) -> alpha represents shadow opacity
    alpha = np.ones_like(brightness) * 255.0
    
    # Thresholding for background removal
    bg_mask = (brightness > 0.975) & (saturation < 0.035)
    alpha[bg_mask] = 0.0
    
    # Smooth shadow transition
    shadow_mask = (brightness <= 0.975) & (brightness > 0.88) & (saturation < 0.05)
    shadow_factor = (0.975 - brightness[shadow_mask]) / (0.975 - 0.88)
    alpha[shadow_mask] = np.clip(shadow_factor * 220.0, 0.0, 255.0)
    
    # Adjust RGB so transparent white doesn't create white fringes:
    # Blend towards the actual object color or dark shadow
    arr[:, :, 3] = alpha
    
    # Convert back to PIL
    result = Image.fromarray(arr.astype(np.uint8))
    
    # Auto-crop to content bounding box
    bbox = result.getbbox()
    if bbox:
        x0, y0, x1, y1 = bbox
        w, h = result.size
        crop_box = (
            max(0, x0 - crop_padding),
            max(0, y0 - crop_padding),
            min(w, x1 + crop_padding),
            min(h, y1 + crop_padding)
        )
        result = result.crop(crop_box)
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    result.save(output_path, "PNG")
    print(f"Saved: {output_path} (size: {result.size})")

items = [
    (
        r"C:\Users\Chirag\.gemini\antigravity-ide\brain\8f36ea6a-43a4-4e27-afb0-704a158f4ecb\olfa_knife_cozy_1792833818306.jpg",
        r"public\images\olfa_knife_cozy.png"
    ),
    (
        r"C:\Users\Chirag\.gemini\antigravity-ide\brain\8f36ea6a-43a4-4e27-afb0-704a158f4ecb\drafting_pen_cozy_1792833844507.jpg",
        r"public\images\drafting_pen_cozy.png"
    ),
    (
        r"C:\Users\Chirag\.gemini\antigravity-ide\brain\8f36ea6a-43a4-4e27-afb0-704a158f4ecb\paper_clips_cozy_1792833870366.jpg",
        r"public\images\paper_clips_cozy.png"
    ),
    (
        r"C:\Users\Chirag\.gemini\antigravity-ide\brain\8f36ea6a-43a4-4e27-afb0-704a158f4ecb\eraser_block_cozy_1792833905890.jpg",
        r"public\images\eraser_block_cozy.png"
    ),
]

for src, dst in items:
    isolate_white_bg(src, dst)
