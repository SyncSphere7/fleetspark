#!/usr/bin/env python3
"""Convert FleetSpark markdown documents to PDF."""

import os
import markdown
from weasyprint import HTML, CSS

DOCS_DIR = "/workspace/fleetspark"
OUTPUT_DIR = "/workspace/fleetspark/pdfs"

DOCS = [
    ("prd-v2-unified.md", "01_FleetSpark_PRD_v2_Unified.md"),
    ("architecture.md", "02_FleetSpark_Architecture.md"),
    ("database-schema.md", "03_FleetSpark_Database_Schema.md"),
    ("api-spec.md", "04_FleetSpark_API_Specification.md"),
    ("ui-ux-wireframes.md", "05_FleetSpark_UI_UX_Wireframes.md"),
    ("deployment.md", "06_FleetSpark_Deployment_Guide.md"),
    ("user-manual.md", "07_FleetSpark_User_Manual.md"),
    ("kiira-pilot-proposal.md", "08_FleetSpark_Kiira_Pilot_Proposal.md"),
    ("financing-module.md", "09_FleetSpark_Financing_Module.md"),
    ("ev-industry-uganda-report.md", "10_EV_Industry_Uganda_Report.md"),
]

CSS_STYLE = """
@page {
    size: A4;
    margin: 2cm 2.5cm;
    @bottom-center {
        content: counter(page);
        font-size: 10px;
        color: #666;
    }
}
body {
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    font-size: 11px;
    line-height: 1.6;
    color: #1a1a1a;
    max-width: 100%;
}
h1 {
    font-size: 22px;
    color: #1e40af;
    border-bottom: 3px solid #2563eb;
    padding-bottom: 8px;
    margin-top: 30px;
    page-break-before: always;
}
h1:first-of-type {
    page-break-before: avoid;
}
h2 {
    font-size: 17px;
    color: #1e3a8a;
    border-bottom: 1px solid #93c5fd;
    padding-bottom: 5px;
    margin-top: 24px;
}
h3 {
    font-size: 14px;
    color: #1e40af;
    margin-top: 18px;
}
h4 {
    font-size: 12px;
    color: #374151;
    margin-top: 14px;
}
p {
    margin: 8px 0;
    text-align: justify;
}
table {
    border-collapse: collapse;
    width: 100%;
    margin: 12px 0;
    font-size: 10px;
    page-break-inside: avoid;
}
th {
    background-color: #1e40af;
    color: white;
    padding: 8px 10px;
    text-align: left;
    font-weight: 600;
}
td {
    border: 1px solid #d1d5db;
    padding: 6px 10px;
}
tr:nth-child(even) {
    background-color: #f0f7ff;
}
code {
    background-color: #f3f4f6;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 10px;
    font-family: 'Consolas', 'Courier New', monospace;
}
pre {
    background-color: #1e293b;
    color: #e2e8f0;
    padding: 14px;
    border-radius: 6px;
    overflow-x: auto;
    font-size: 9px;
    line-height: 1.5;
    page-break-inside: avoid;
}
pre code {
    background: none;
    color: inherit;
    padding: 0;
}
blockquote {
    border-left: 4px solid #2563eb;
    margin: 12px 0;
    padding: 8px 16px;
    background-color: #eff6ff;
    font-style: italic;
}
ul, ol {
    padding-left: 20px;
    margin: 6px 0;
}
li {
    margin: 3px 0;
}
strong {
    color: #1e3a8a;
}
hr {
    border: none;
    border-top: 2px solid #e5e7eb;
    margin: 20px 0;
}
img {
    max-width: 100%;
}
"""

os.makedirs(OUTPUT_DIR, exist_ok=True)

def md_to_pdf(md_filename, pdf_filename):
    md_path = os.path.join(DOCS_DIR, md_filename)
    pdf_path = os.path.join(OUTPUT_DIR, pdf_filename.replace(".md", ".pdf"))
    
    if not os.path.exists(md_path):
        print(f"  SKIP: {md_filename} not found")
        return
    
    with open(md_path, "r", encoding="utf-8") as f:
        md_content = f.read()
    
    # Convert markdown to HTML
    html_content = markdown.markdown(
        md_content,
        extensions=["tables", "fenced_code", "toc", "nl2br", "sane_lists"]
    )
    
    # Wrap in HTML document
    full_html = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{pdf_filename.replace('.pdf', '').replace('_', ' ')}</title>
</head>
<body>
{html_content}
</body>
</html>"""
    
    # Convert to PDF
    html_obj = HTML(string=full_html, base_url=DOCS_DIR)
    css_obj = CSS(string=CSS_STYLE)
    html_obj.write_pdf(pdf_path, stylesheets=[css_obj])
    
    size_kb = os.path.getsize(pdf_path) // 1024
    print(f"  OK: {pdf_filename} ({size_kb} KB)")

print("=" * 60)
print("FleetSpark Document Generation — PDF Export")
print("=" * 60)

for md_file, pdf_file in DOCS:
    try:
        md_to_pdf(md_file, pdf_file)
    except Exception as e:
        print(f"  ERROR: {md_file} — {e}")

print("=" * 60)
print(f"All PDFs saved to: {OUTPUT_DIR}")
print("=" * 60)
