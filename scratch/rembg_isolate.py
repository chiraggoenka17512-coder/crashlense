import os
import glob
from PIL import Image
from rembg import remove, new_session

session = new_session("u2netp")

def process_file(src_path, dst_path, crop_padding=15):
    print(f"Processing: {src_path} -> {dst_path}")
    input_img = Image.open(src_path)
    output_img = remove(input_img, session=session)
    
    # Auto-crop transparent boundaries
    bbox = output_img.getbbox()
    if bbox:
        w, h = output_img.size
        x0, y0, x1, y1 = bbox
        crop_box = (
            max(0, x0 - crop_padding),
            max(0, y0 - crop_padding),
            min(w, x1 + crop_padding),
            min(h, y1 + crop_padding)
        )
        output_img = output_img.crop(crop_box)
        
    os.makedirs(os.path.dirname(dst_path), exist_ok=True)
    output_img.save(dst_path, "PNG")
    print(f"Successfully saved {dst_path} (Size: {output_img.size})")

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
        r"C:\Users\Chirag\.gemini\antigravity-ide\brain\8f36ea6a-43a4-4e27-afb0-704a158f4ecb\wood_pencil_cozy_1792834465893.jpg",
        r"public\images\wood_pencil_cozy.png"
    ),
    (
        r"C:\Users\Chirag\.gemini\antigravity-ide\brain\8f36ea6a-43a4-4e27-afb0-704a158f4ecb\paper_clips_cozy_1792833870366.jpg",
        r"public\images\paper_clips_cozy.png"
    ),
    (
        r"C:\Users\Chirag\.gemini\antigravity-ide\brain\8f36ea6a-43a4-4e27-afb0-704a158f4ecb\eraser_block_cozy_1792833905890.jpg",
        r"public\images\eraser_block_cozy.png"
    )
]

for src, dst in items:
    if os.path.exists(src):
        process_file(src, dst)
    else:
        print(f"File not found: {src}")
