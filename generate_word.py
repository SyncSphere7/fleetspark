#!/usr/bin/env python3
"""Convert FleetSpark markdown documents to Word (.docx)."""

import os
import re
import markdown
from docx import Document
from docx.shared import Pt, Inches, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

DOCS_DIR = "/workspace/fleetspark"
OUTPUT_DIR = "/workspace/fleetspark/word"

DOCS = [
    ("prd-v2-unified.md", "01_FleetSpark_PRD_v2_Unified.docx"),
    ("architecture.md", "02_FleetSpark_Architecture.docx"),
    ("database-schema.md", "03_FleetSpark_Database_Schema.docx"),
    ("api-spec.md", "04_FleetSpark_API_Specification.docx"),
    ("ui-ux-wireframes.md", "05_FleetSpark_UI_UX_Wireframes.docx"),
    ("deployment.md", "06_FleetSpark_Deployment_Guide.docx"),
    ("user-manual.md", "07_FleetSpark_User_Manual.docx"),
    ("kiira-pilot-proposal.md", "08_FleetSpark_Kiira_Pilot_Proposal.docx"),
    ("financing-module.md", "09_FleetSpark_Financing_Module.docx"),
    ("10_EV_Industry_Uganda_Report.md", "10_EV_Industry_Uganda_Report.docx"),
]

# Colors
DARK_BLUE = RGBColor(0x1e, 0x40, 0xaf)
MEDIUM_BLUE = RGBColor(0x25, 0x63, 0xeb)
LIGHT_BLUE = RGBColor(0x93, 0xc5, 0xfd)
DARK_GRAY = RGBColor(0x37, 0x41, 0x51)
MEDIUM_GRAY = RGBColor(0x6b, 0x72, 0x80)
LIGHT_GRAY = RGBColor(0xf3, 0xf4, 0xf6)
WHITE = RGBColor(0xff, 0xff, 0xff)


def set_cell_shading(cell, color):
    """Set background color of a table cell."""
    shading = OxmlElement("w:shd")
    shading.set(qn("w:fill"), color)
    shading.set(qn("w:val"), "clear")
    cell._tc.get_or_add_tcPr().append(shading)


def add_styled_paragraph(doc, text, font_size=11, bold=False, color=None, alignment=None, space_after=6):
    """Add a styled paragraph."""
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(space_after)
    if alignment:
        p.alignment = alignment
    run = p.add_run(text)
    run.font.size = Pt(font_size)
    run.font.bold = bold
    if color:
        run.font.color.rgb = color
    return p


def parse_simple_html_to_docx(doc, html_content):
    """Parse basic HTML from markdown and add to docx document."""
    # Simple approach: convert markdown to text and format based on markdown patterns
    pass


def md_to_docx(md_filename, docx_filename):
    md_path = os.path.join(DOCS_DIR, md_filename)
    docx_path = os.path.join(OUTPUT_DIR, docx_filename)
    
    if not os.path.exists(md_path):
        print(f"  SKIP: {md_filename} not found")
        return
    
    with open(md_path, "r", encoding="utf-8") as f:
        lines = f.readlines()
    
    doc = Document()
    
    # Set default font
    style = doc.styles["Normal"]
    font = style.font
    font.name = "Calibri"
    font.size = Pt(11)
    
    # Configure page margins
    for section in doc.sections:
        section.top_margin = Cm(2)
        section.bottom_margin = Cm(2)
        section.left_margin = Cm(2.5)
        section.right_margin = Cm(2.5)
    
    in_code_block = False
    code_lines = []
    in_table = False
    table_rows = []
    table_header = None
    
    i = 0
    while i < len(lines):
        line = lines[i].rstrip()
        
        # Code blocks
        if line.startswith("```"):
            if in_code_block:
                # End code block
                p = doc.add_paragraph()
                p.paragraph_format.space_after = Pt(4)
                for cl in code_lines:
                    run = p.add_run(cl + "\n")
                    run.font.name = "Consolas"
                    run.font.size = Pt(9)
                    run.font.color.rgb = RGBColor(0xe2, 0xe8, 0xf0)
                # Set code block background via shading on paragraph (approximate)
                in_code_block = False
                code_lines = []
            else:
                in_code_block = True
                code_lines = []
            i += 1
            continue
        
        if in_code_block:
            code_lines.append(line)
            i += 1
            continue
        
        # Headings
        if line.startswith("# "):
            text = line[2:].strip()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(24)
            p.paragraph_format.space_after = Pt(8)
            run = p.add_run(text)
            run.font.size = Pt(22)
            run.font.bold = True
            run.font.color.rgb = DARK_BLUE
            # Add bottom border via paragraph formatting
            pPr = p._p.get_or_add_pPr()
            pBdr = OxmlElement("w:pBdr")
            bottom = OxmlElement("w:bottom")
            bottom.set(qn("w:val"), "single")
            bottom.set(qn("w:sz"), "12")
            bottom.set(qn("w:space"), "1")
            bottom.set(qn("w:color"), "2563EB")
            pBdr.append(bottom)
            pPr.append(pBdr)
            i += 1
            continue
        
        if line.startswith("## "):
            text = line[3:].strip()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(18)
            p.paragraph_format.space_after = Pt(6)
            run = p.add_run(text)
            run.font.size = Pt(16)
            run.font.bold = True
            run.font.color.rgb = DARK_BLUE
            pPr = p._p.get_or_add_pPr()
            pBdr = OxmlElement("w:pBdr")
            bottom = OxmlElement("w:bottom")
            bottom.set(qn("w:val"), "single")
            bottom.set(qn("w:sz"), "6")
            bottom.set(qn("w:space"), "1")
            bottom.set(qn("w:color"), "93C5FD")
            pBdr.append(bottom)
            pPr.append(pBdr)
            i += 1
            continue
        
        if line.startswith("### "):
            text = line[4:].strip()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(14)
            p.paragraph_format.space_after = Pt(4)
            run = p.add_run(text)
            run.font.size = Pt(13)
            run.font.bold = True
            run.font.color.rgb = DARK_BLUE
            i += 1
            continue
        
        if line.startswith("#### "):
            text = line[5:].strip()
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(10)
            p.paragraph_format.space_after = Pt(3)
            run = p.add_run(text)
            run.font.size = Pt(11)
            run.font.bold = True
            run.font.color.rgb = DARK_GRAY
            i += 1
            continue
        
        # Horizontal rule
        if line.strip() == "---" or line.strip() == "===":
            p = doc.add_paragraph()
            p.paragraph_format.space_before = Pt(12)
            p.paragraph_format.space_after = Pt(12)
            pPr = p._p.get_or_add_pPr()
            pBdr = OxmlElement("w:pBdr")
            bottom = OxmlElement("w:bottom")
            bottom.set(qn("w:val"), "single")
            bottom.set(qn("w:sz"), "6")
            bottom.set(qn("w:space"), "1")
            bottom.set(qn("w:color"), "E5E7EB")
            pBdr.append(bottom)
            pPr.append(pBdr)
            i += 1
            continue
        
        # Table detection
        if "|" in line and line.strip().startswith("|"):
            # Parse table row
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            # Skip separator rows
            if all(re.match(r'^[-:]+$', c.replace(" ", "")) for c in cells if c):
                i += 1
                continue
            
            if not in_table:
                in_table = True
                table_header = cells
                table_rows = []
            
            table_rows.append(cells)
            i += 1
            continue
        else:
            if in_table and table_header:
                # Write the table
                num_cols = len(table_header)
                table = doc.add_table(rows=1 + len(table_rows), cols=num_cols)
                table.style = "Table Grid"
                table.alignment = WD_TABLE_ALIGNMENT.CENTER
                
                # Header row
                for j, cell_text in enumerate(table_header):
                    cell = table.rows[0].cells[j]
                    cell.text = ""
                    p = cell.paragraphs[0]
                    run = p.add_run(cell_text)
                    run.font.bold = True
                    run.font.size = Pt(10)
                    run.font.color.rgb = WHITE
                    set_cell_shading(cell, "1E40AF")
                
                # Data rows
                for r_idx, row in enumerate(table_rows):
                    for j, cell_text in enumerate(row):
                        if j < num_cols:
                            cell = table.rows[r_idx + 1].cells[j]
                            cell.text = ""
                            p = cell.paragraphs[0]
                            run = p.add_run(cell_text)
                            run.font.size = Pt(10)
                            if r_idx % 2 == 1:
                                set_cell_shading(cell, "F0F7FF")
                
                doc.add_paragraph()  # Spacer
                in_table = False
                table_header = None
                table_rows = []
        
        # Empty line
        if not line.strip():
            i += 1
            continue
        
        # Blockquote
        if line.startswith("> "):
            text = line[2:].strip()
            p = doc.add_paragraph()
            p.paragraph_format.left_indent = Cm(1)
            p.paragraph_format.space_after = Pt(4)
            run = p.add_run(text)
            run.font.italic = True
            run.font.color.rgb = DARK_GRAY
            # Left border
            pPr = p._p.get_or_add_pPr()
            pBdr = OxmlElement("w:pBdr")
            left = OxmlElement("w:left")
            left.set(qn("w:val"), "single")
            left.set(qn("w:sz"), "12")
            left.set(qn("w:space"), "4")
            left.set(qn("w:color"), "2563EB")
            pBdr.append(left)
            pPr.append(pBdr)
            i += 1
            continue
        
        # List items
        if re.match(r'^[-*+]\s', line.strip()) or re.match(r'^\d+\.\s', line.strip()):
            text = re.sub(r'^[-*+]\s|^\d+\.\s', '', line.strip())
            p = doc.add_paragraph(style="List Bullet")
            # Clean markdown formatting from text
            text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)
            text = re.sub(r'\*(.*?)\*', r'\1', text)
            text = re.sub(r'`(.*?)`', r'\1', text)
            run = p.add_run(text)
            run.font.size = Pt(11)
            i += 1
            continue
        
        # Regular paragraph
        text = line.strip()
        # Clean markdown formatting
        text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)
        text = re.sub(r'\*(.*?)\*', r'\1', text)
        text = re.sub(r'`(.*?)`', r'\1', text)
        text = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', text)
        
        if text:
            p = doc.add_paragraph()
            p.paragraph_format.space_after = Pt(4)
            run = p.add_run(text)
            run.font.size = Pt(11)
        
        i += 1
    
    # Handle any remaining table
    if in_table and table_header:
        num_cols = len(table_header)
        table = doc.add_table(rows=1 + len(table_rows), cols=num_cols)
        table.style = "Table Grid"
        for j, cell_text in enumerate(table_header):
            cell = table.rows[0].cells[j]
            cell.text = ""
            p = cell.paragraphs[0]
            run = p.add_run(cell_text)
            run.font.bold = True
            run.font.size = Pt(10)
            run.font.color.rgb = WHITE
            set_cell_shading(cell, "1E40AF")
        for r_idx, row in enumerate(table_rows):
            for j, cell_text in enumerate(row):
                if j < num_cols:
                    cell = table.rows[r_idx + 1].cells[j]
                    cell.text = ""
                    p = cell.paragraphs[0]
                    run = p.add_run(cell_text)
                    run.font.size = Pt(10)
                    if r_idx % 2 == 1:
                        set_cell_shading(cell, "F0F7FF")
    
    doc.save(docx_path)
    size_kb = os.path.getsize(docx_path) // 1024
    print(f"  OK: {docx_filename} ({size_kb} KB)")


os.makedirs(OUTPUT_DIR, exist_ok=True)

print("=" * 60)
print("FleetSpark Document Generation — Word Export")
print("=" * 60)

for md_file, docx_file in DOCS:
    try:
        md_to_docx(md_file, docx_file)
    except Exception as e:
        print(f"  ERROR: {md_file} — {e}")

print("=" * 60)
print(f"All Word docs saved to: {OUTPUT_DIR}")
print("=" * 60)
