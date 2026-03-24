#!/usr/bin/env python3
"""
MaltaPulse Content Generator
Generates article JSON from markdown files for the site.
"""
import os
import json
import re

ARTICLES_DIR = "articles"
OUTPUT_FILE = "data/articles.json"

def parse_article(filepath):
    with open(filepath) as f:
        content = f.read()
    
    # Extract title from first line
    lines = content.strip().split('\n')
    title = lines[0].replace('# ', '')
    
    # Extract date
    date_match = re.search(r'\*([^*]+)\*', content)
    date = date_match.group(1) if date_match else "March 2026"
    
    # Extract category from filename pattern
    article_num = os.path.basename(filepath).replace('.md', '')
    
    # Extract content (skip title and date)
    content_lines = [l for l in lines if not l.startswith('#') and not l.startswith('*')]
    body = '\n'.join(content_lines).strip()
    
    return {
        'id': article_num,
        'title': title,
        'date': date,
        'content': body,
        'word_count': len(body.split()),
        'reading_time': max(1, len(body.split()) // 200)
    }

# Process all articles
articles = []
for f in sorted(os.listdir(ARTICLES_DIR)):
    if f.endswith('.md'):
        article = parse_article(os.path.join(ARTICLES_DIR, f))
        articles.append(article)
        print(f"  ✓ {article['title'][:50]}... ({article['reading_time']} min)")

# Save
with open(OUTPUT_FILE, 'w') as f:
    json.dump({'articles': articles, 'count': len(articles)}, f, indent=2)

print(f"\nProcessed {len(articles)} articles → {OUTPUT_FILE}")
