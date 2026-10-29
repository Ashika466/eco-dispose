import os
import re
import json

BASE_DIR = r"C:\Users\HP\.gemini\antigravity\scratch\eco-dispose"

def test_file_existence():
    files = [
        "index.html",
        "README.md",
        "css/styles.css",
        "js/data.js",
        "js/storage.js",
        "js/map.js",
        "js/charts.js",
        "js/awareness.js",
        "js/app.js",
        "assets/logo.svg",
        "assets/favicon.svg"
    ]
    for rel in files:
        path = os.path.join(BASE_DIR, rel.replace('/', os.sep))
        assert os.path.exists(path), f"Missing file: {rel}"
        assert os.path.getsize(path) > 0, f"File is empty: {rel}"
        print(f"[PASS] File exists and non-empty: {rel} ({os.path.getsize(path)} bytes)")

def test_html_structure():
    path = os.path.join(BASE_DIR, "index.html")
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()

    # Required IDs and views
    views = ["view-home", "view-dispose", "view-centres", "view-guide", "view-analytics", "view-history", "view-bcs508"]
    for v in views:
        assert f'id="{v}"' in html, f"Missing view section: {v}"
        print(f"[PASS] HTML contains view: {v}")

    # Required Form elements
    elements = [
        "appliance-disposal-form",
        "form-category",
        "form-description",
        "form-quantity",
        "form-weight",
        "form-condition",
        "form-preference",
        "form-area",
        "form-pincode"
    ]
    for el in elements:
        assert f'id="{el}"' in html, f"Missing form element: {el}"
        print(f"[PASS] HTML contains element: {el}")

    # Tagline check
    assert "Dispose Responsibly. Recycle Sustainably." in html, "Missing exact required tagline!"
    print("[PASS] Tagline 'Dispose Responsibly. Recycle Sustainably.' is present in HTML")

    # Environmental problem check
    assert "Improper Disposal of Electronic Appliances and E-Waste" in html, "Missing exact required environmental problem!"
    print("[PASS] Environmental Problem title is present in HTML")

def test_js_integrity():
    for js_file in ["data.js", "storage.js", "map.js", "charts.js", "awareness.js", "app.js"]:
        path = os.path.join(BASE_DIR, "js", js_file)
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        # Basic brace balancing check
        open_curly = content.count('{')
        close_curly = content.count('}')
        assert open_curly == close_curly, f"Brace mismatch in {js_file}: {open_curly} vs {close_curly}"
        print(f"[PASS] JS Brace count balanced for {js_file} ({open_curly} pairs)")

def test_css_integrity():
    path = os.path.join(BASE_DIR, "css", "styles.css")
    with open(path, "r", encoding="utf-8") as f:
        css = f.read()
    open_curly = css.count('{')
    close_curly = css.count('}')
    assert open_curly == close_curly, f"CSS Brace mismatch: {open_curly} vs {close_curly}"
    print(f"[PASS] CSS Brace count balanced ({open_curly} rules)")

if __name__ == "__main__":
    print("--- RUNNING ECODISPOSE AUTOMATED INTEGRITY TESTS ---")
    test_file_existence()
    test_html_structure()
    test_js_integrity()
    test_css_integrity()
    print("--- ALL TESTS PASSED SUCCESSFULLY! ---")
