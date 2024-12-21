import requests
import re
import json
import time
from pymongo import MongoClient

cookie = "sb=yY8PZ2hJgS4IYsJYftGlwNxP; datr=yY8PZ8-6cScq5TTemNkDKhaE; ps_l=1; ps_n=1; c_user=100070448054752; xs=20%3AOMqR2kLr7XWf1A%3A2%3A1734707777%3A-1%3A6427; fr=1OvTlq5o8l4fR6qPP.AWV7CQ7l7EjbRBmHSjfiojhREiE.BnZYgy..AAA.0.0.BnZZb5.AWX80vGQeEQ; dpr=1.125; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1734711044099%2C%22v%22%3A1%7D; wd=1126x811"
url = "https://www.facebook.com/api/graphql/"
headers = {
'accept': '*/*',
'accept-language': 'vi,en;q=0.9',
'content-type': 'application/x-www-form-urlencoded',
'cookie': cookie,
'origin': 'https://www.facebook.com',
'priority': 'u=1, i',
'referer': 'https://www.facebook.com',
'sec-ch-prefers-color-scheme': 'light',
'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
'sec-ch-ua-full-version-list': '"Google Chrome";v="131.0.6778.205", "Chromium";v="131.0.6778.205", "Not_A Brand";v="24.0.0.0"',
'sec-ch-ua-mobile': '?0',
'sec-ch-ua-model': '""',
'sec-ch-ua-platform': '"Windows"',
'sec-ch-ua-platform-version': '"15.0.0"',
'sec-fetch-dest': 'empty',
'sec-fetch-mode': 'cors',
'sec-fetch-site': 'same-origin',
'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
'x-asbd-id': '129477',
'x-fb-friendly-name': 'GroupsCometFeedRegularStoriesPaginationQuery',
'x-fb-lsd': 'JUjVW0chjR5EEXztgIL_20'
}
payload = '__user=100070448054752&__a=1&__req=3n&__hs=20077.HYP%3Acomet_pkg.2.1.0.2.1&dpr=1&__ccg=EXCELLENT&__rev=1019029190&__s=rpgwby%3A7hbkuy%3Arvsvcx&__hsi=7450513179139818351&__dyn=7xeXzWK2l2u7Ung569yaxG4Qih0noeEb8nwgUaofVUKbgS3qi7UK361twYwJyEiwsobo6u3y4o27wywn82nwb-q7oc81EEbbwto88422y11wBz822wtU4a3a4oaEnxO0Bo4O2-2l2UtwxwhU31wiE567Udo5qfK0zEkxe2GexeeDwkUtxGm2SU4i5oe8cEW4-5pUfEdbwxwhFVovUaU6a1TxW2-VEbUGdG0HE88cA0z8c84p1e4UK2K2WEjxK2B08-269wkopg6C13xe3a3Gfw-Kufxa3mUqwjVqwLwHwGwbu5E&__csr=g8s7IfN4kx4cMBb1n5mxs_NAQAr9SB4ccsOZ9hkzkAWPN2lHGGmnsytiWuoyAWEJtsJdbvh6HQ9Bh4jHvFnl9SlGRHqUyAmLpqUCh2pFUHmERbpdemRJauV4jFLh9eFWrABV5UJyFohy44pp7BDKaLhGjAvBHCGqdy9WHy89UOiHhpuiVozy8WmfGbzVZ3o-mmuQ4pV9em4ojxWUhyaAy8nXxeU98a9ucx2GDV8S49aADDxiUizQaAGiiEjxiUhDQ5EWm9DK6U8UG5F8KmeUgVEizpU4CawLzQ8AAG58Kcggxe3e2y6Vp8K3K5EbA4poowxyUaAczqSGwXDxC1rxeu9wwwzwFBwl9F41rzqye221oyo3pw6rAwoE5t04RwaOaCzU4K0RouyHzUqo1QS0ra1pwo46Oyki9xB4wt815k1kwywNJ90GwjA6U7e04jliLFxK8m4sHFk0MA02se3Wfg1etQ0ri2O0oO8xW08Gwf2041o0vpx500rEUmui-03HS079E1ho4ugCb4w2qU22yVU1r9UC3d0deqi0GECq0Doeo13oG3WOwmEyu0jW0CU5y2a0hC1Yw4US1Xw8W0Z8CbBodUC0qeu0vq0xA0xV2N04gweoaU2DxS08pw1hq0WElBK4o99Uy2a0H8dbgy36zh2xdVD4PHe8G8Q2q7U7GWig1jEO0va264o8U6O1D86o25w1bC02rS-0gB021UdoaQpi90Jxe0XLG3u0Go1oUC0pq2Kfo3Fwlo0ye07aqxj2cb042w18W7o3gwho6C&__comet_req=15&fb_dtsg=NAcOeXHrVuLhqT7H0jkuGoIIQ2Y6eSrq31uA5-iMs7m6mTCiNwaSccQ%3A20%3A1734707777&jazoest=25454&lsd=bxoyItvy_mI7dnM-oKF4_W&__spin_r=1019029190&__spin_b=trunk&__spin_t=1734707779&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=GroupsCometFeedRegularStoriesPaginationQuery&variables=%7B%22count%22%3A3%2C%22cursor%22%3A%22Cg8TZXhpc3RpbmdfdW5pdF9jb3VudAICDwtyZWFsX2N1cnNvcg%2BfQVFIUmlITThzTnFVcjJoV0tpdjFDTEFJZkFwMk8xRWQ1TWtjeHZ0UGVEbmQyYlBEWnJvWGJYQ0tWVldsM0V0ZXp1RWRxZWRxcFhZa1QybFlzRl9yUWZ3SEVBOmV5SXdJam94TnpNME56QTRNVEExTENJeElqbzNOamd5TENJeklqb3dMQ0kwSWpveExDSTFJam95TENJMklqb3RNWDA9DxNoZWFkZXJfZ2xvYmFsX2NvdW50AgEPEm1haW5fZmVlZF9wb3NpdGlvbgICDw1mZWVkX29yZGVyaW5nDw1hdHRhY2hlZF90aW1lDxNpc19ldmVyZ3JlZW5fY3Vyc29yEQAPImlzX29mZmxpbmVfYWdncmVnYXRlZF9wb3N0c19jdXJzb3IRAA8SZ3JvdXBfZmVlZF92ZXJzaW9uDwJWMg8QZGVtb3RlZF9wb3N0X2lkcwoBAQ%3D%3D%22%2C%22feedLocation%22%3A%22GROUP%22%2C%22feedType%22%3A%22DISCUSSION%22%2C%22feedbackSource%22%3A0%2C%22focusCommentID%22%3Anull%2C%22privacySelectorRenderLocation%22%3A%22COMET_STREAM%22%2C%22renderLocation%22%3A%22group%22%2C%22scale%22%3A1%2C%22sortingSetting%22%3A%22CHRONOLOGICAL%22%2C%22stream_initial_count%22%3A1%2C%22useDefaultActor%22%3Afalse%2C%22id%22%3A%22314810416899010%22%2C%22__relay_internal__pv__GHLShouldChangeAdIdFieldNamerelayprovider%22%3Afalse%2C%22__relay_internal__pv__GHLShouldChangeSponsoredDataFieldNamerelayprovider%22%3Afalse%2C%22__relay_internal__pv__IsWorkUserrelayprovider%22%3Afalse%2C%22__relay_internal__pv__CometFeedStoryDynamicResolutionPhotoAttachmentRenderer_experimentWidthrelayprovider%22%3A500%2C%22__relay_internal__pv__CometImmersivePhotoCanUserDisable3DMotionrelayprovider%22%3Afalse%2C%22__relay_internal__pv__IsMergQAPollsrelayprovider%22%3Afalse%2C%22__relay_internal__pv__FBReelsMediaFooter_comet_enable_reels_ads_gkrelayprovider%22%3Afalse%2C%22__relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider%22%3Afalse%2C%22__relay_internal__pv__CometUFIShareActionMigrationrelayprovider%22%3Atrue%2C%22__relay_internal__pv__StoriesArmadilloReplyEnabledrelayprovider%22%3Atrue%2C%22__relay_internal__pv__EventCometCardImage_prefetchEventImagerelayprovider%22%3Afalse%7D&server_timestamps=true&doc_id=8710004115744333'

def getcursor():
    response = requests.request("POST", url, headers=headers, data=payload)
    cursor_pattern = r'"cursor":"([^"]+)"'
    cursor_match = re.search(cursor_pattern, response.text)

    cursor = cursor_match.group(1) if cursor_match else "Cursor not found"
    return cursor
def getdata(url):
    payload = {}
    headers = {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'vi,en;q=0.9',
        'cache-control': 'max-age=0',
        'cookie': cookie,
        'dpr': '0.9',
        'priority': 'u=0, i',
        'sec-ch-prefers-color-scheme': 'light',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-full-version-list': '"Google Chrome";v="131.0.6778.205", "Chromium";v="131.0.6778.205", "Not_A Brand";v="24.0.0.0"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-model': '""',
        'sec-ch-ua-platform': '"Windows"',
        'sec-ch-ua-platform-version': '"15.0.0"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'viewport-width': '1446'
    }

    response = requests.request("GET", url, headers=headers, data=payload)
    
    try:
        response.encoding = 'utf-8'
        
        title_pattern = r'<title>.*?#([a-zA-Z0-9]+)</title>'
        tag_match = re.search(title_pattern, response.text)
        tag = tag_match.group(1) if tag_match else ""
        
        image_patterns = [
            r'<meta property="og:image" content="([^"]+)"',
            r'"image":{"uri":"([^"]+)"',
            r'https://[^"]*?fbcdn\.net[^"]*?/v/t39\.[^"]+?/\d+_\d+_\d+_n\.(?:jpg|jpeg|png)[^"]*?(?:width=\d+|height=\d+)[^"]*?'
        ]
        
        images = []
        for pattern in image_patterns:
            matches = re.findall(pattern, response.text)
            for match in matches:
                if isinstance(match, tuple):
                    match = match[0]
                if 'scontent' in match and ('_n.' in match or '_o.' in match):
                    images.append(match.replace('\\/', '/'))
        
        images = list(dict.fromkeys(images))[:3]
        
        
        print(f"URL: {url}")
        print(f"Tag found: {tag}")
        print(f"Number of images found: {len(images)}")
        print("First image URL:", images[0] if images else "No images found")
        
        return {
            "tag": tag,
            "images": images
        }
        
    except Exception as e:
        print(f"Lỗi khi parse dữ liệu: {e}")
        return {"tag": "", "images": []}
def getpage():
    cursor = getcursor()
    payload=f'__user=100070448054752&__a=1&__req=3n&__hs=20077.HYP:comet_pkg.2.1.0.2.1&dpr=1&__ccg=EXCELLENT&__rev=1019029190&__s=rpgwby:7hbkuy:rvsvcx&__hsi=7450513179139818351&__dyn=7xeXzWK2l2u7Ung569yaxG4Qih0noeEb8nwgUaofVUKbgS3qi7UK361twYwJyEiwsobo6u3y4o27wywn82nwb-q7oc81EEbbwto88422y11wBz822wtU4a3a4oaEnxO0Bo4O2-2l2UtwxwhU31wiE567Udo5qfK0zEkxe2GexeeDwkUtxGm2SU4i5oe8cEW4-5pUfEdbwxwhFVovUaU6a1TxW2-VEbUGdG0HE88cA0z8c84p1e4UK2K2WEjxK2B08-269wkopg6C13xe3a3Gfw-Kufxa3mUqwjVqwLwHwGwbu5E&__csr=g8s7IfN4kx4cMBb1n5mxs_NAQAr9SB4ccsOZ9hkzkAWPN2lHGGmnsytiWuoyAWEJtsJdbvh6HQ9Bh4jHvFnl9SlGRHqUyAmLpqUCh2pFUHmERbpdemRJauV4jFLh9eFWrABV5UJyFohy44pp7BDKaLhGjAvBHCGqdy9WHy89UOiHhpuiVozy8WmfGbzVZ3o-mmuQ4pV9em4ojxWUhyaAy8nXxeU98a9ucx2GDV8S49aADDxiUizQaAGiiEjxiUhDQ5EWm9DK6U8UG5F8KmeUgVEizpU4CawLzQ8AAG58Kcggxe3e2y6Vp8K3K5EbA4poowxyUaAczqSGwXDxC1rxeu9wwwzwFBwl9F41rzqye221oyo3pw6rAwoE5t04RwaOaCzU4K0RouyHzUqo1QS0ra1pwo46Oyki9xB4wt815k1kwywNJ90GwjA6U7e04jliLFxK8m4sHFk0MA02se3Wfg1etQ0ri2O0oO8xW08Gwf2041o0vpx500rEUmui-03HS079E1ho4ugCb4w2qU22yVU1r9UC3d0deqi0GECq0Doeo13oG3WOwmEyu0jW0CU5y2a0hC1Yw4US1Xw8W0Z8CbBodUC0qeu0vq0xA0xV2N04gweoaU2DxS08pw1hq0WElBK4o99Uy2a0H8dbgy36zh2xdVD4PHe8G8Q2q7U7GWig1jEO0va264o8U6O1D86o25w1bC02rS-0gB021UdoaQpi90Jxe0XLG3u0Go1oUC0pq2Kfo3Fwlo0ye07aqxj2cb042w18W7o3gwho6C&__comet_req=15&fb_dtsg=NAcOeXHrVuLhqT7H0jkuGoIIQ2Y6eSrq31uA5-iMs7m6mTCiNwaSccQ:20:1734707777&jazoest=25454&lsd=bxoyItvy_mI7dnM-oKF4_W&__spin_r=1019029190&__spin_b=trunk&__spin_t=1734707779&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=GroupsCometFeedRegularStoriesPaginationQuery&variables={{"count":3,"cursor":"{cursor}","feedLocation":"GROUP","feedType":"DISCUSSION","feedbackSource":0,"focusCommentID":null,"privacySelectorRenderLocation":"COMET_STREAM","renderLocation":"group","scale":1,"sortingSetting":"CHRONOLOGICAL","stream_initial_count":1,"useDefaultActor":false,"id":"314810416899010","__relay_internal__pv__GHLShouldChangeAdIdFieldNamerelayprovider":false,"__relay_internal__pv__GHLShouldChangeSponsoredDataFieldNamerelayprovider":false,"__relay_internal__pv__IsWorkUserrelayprovider":false,"__relay_internal__pv__CometFeedStoryDynamicResolutionPhotoAttachmentRenderer_experimentWidthrelayprovider":500,"__relay_internal__pv__CometImmersivePhotoCanUserDisable3DMotionrelayprovider":false,"__relay_internal__pv__IsMergQAPollsrelayprovider":false,"__relay_internal__pv__FBReelsMediaFooter_comet_enable_reels_ads_gkrelayprovider":false,"__relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider":false,"__relay_internal__pv__CometUFIShareActionMigrationrelayprovider":true,"__relay_internal__pv__StoriesArmadilloReplyEnabledrelayprovider":true,"__relay_internal__pv__EventCometCardImage_prefetchEventImagerelayprovider":false}}&server_timestamps=true&doc_id=8710004115744333'
   
    response = requests.request("POST", url, headers=headers, data=payload)
    cursor_pattern = r'"cursor":"([^"]+)"'
    cursor_match = re.search(cursor_pattern, response.text)

    cursor = cursor_match.group(1) if cursor_match else "Cursor not found"
    print(cursor)
    permalink_pattern = r'"url":"(https:\\\/\\\/www\.facebook\.com\\\/groups\\\/\d+\\\/permalink\\\/\d+\\\/?)"'
    permalink_links = re.findall(permalink_pattern, response.text)

    unique_links = set()

    for link in permalink_links:
        clean_link = link.replace('\\/', '/')
        unique_links.add(clean_link)

    for link in unique_links:
        print(getdata(link))
    
while True:
    
    getpage()
    time.sleep(5)
    