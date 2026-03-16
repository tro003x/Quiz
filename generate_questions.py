import json

questions = []
categories = ['বাংলার সালতানাত', 'বাংলার মুসলিম ঐতিহ্য', 'মুসলিম বিপ্লবী আন্দোলন', 'ব্রিটিশ বিরোধী সংগ্রাম']

qid = 1
for cat in categories:
    for i in range(25):
        questions.append({
            'id': qid,
            'question': f'প্রশ্ন {i+1}: {cat}',
            'options': ['অপশন ১', 'অপশন ২', 'অপশন ৩', 'অপশন ৪'],
            'correctIndex': 0,
            'explanation': f'উত্তর {i+1}',
            'category': cat,
            'difficulty': 'medium'
        })
        qid += 1

with open('data/questions.json', 'w', encoding='utf-8') as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

print(f'Created {len(questions)} questions')
