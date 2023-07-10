import pandas as pd
import json

# 엑셀 파일 읽기
df = pd.read_excel('C:/Users/user/vscode/workspace/vs-data-service-web-prototype/src/pionada_dataset.xlsx')

# 데이터 프레임을 리스트 형태로 변환
data = df.values.tolist()

result = []

# 데이터를 처리하여 JSON 형식으로 변환
for row in data:
    category = row[3]
    name = row[4]
    
    # 카테고리가 이미 JSON에 추가되었는지 확인
    category_exists = False
    for item in result:
        if item["name"] == category:
            category_exists = True
            
            # 이미 있는 데이터인 경우 "loc" 값을 1씩 증가
            if any(child["name"] == name for child in item["children"]):
                for child in item["children"]:
                    if child["name"] == name:
                        child["loc"] += 1
                        break
            else:
                item["children"].append({
                    "name": name,
                    "color": "hsl(264, 70%, 50%)",
                    "loc": 1
                })
                
            break
    
    # 카테고리가 JSON에 없으면 새로 추가
    if not category_exists:
        item = {
            "name": category,
            "color": "hsl(264, 70%, 50%)",
            "children": [
                {
                    "name": name,
                    "color": "hsl(264, 70%, 50%)",
                    "loc": 1
                }
            ]
        }
        result.append(item)
        
# JSON 형식으로 변환하여 파일로 저장
with open('output.json', 'w', encoding='utf-8') as json_file:
    json.dump(result, json_file, indent=4, ensure_ascii=False)

print("JSON 파일이 생성되었습니다.")