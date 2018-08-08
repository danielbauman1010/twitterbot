import requests

scrap = requests.session() #using a session to request pages.
user = input('user: ')
r = scrap.get("https://www.twitter.com/"+user)
page = r.text


tags = page.split('<') #splitting html by < signs

tweets = []

for tag in tags:
    if tag.startswith('p ') and 'js-tweet-text tweet-text' in tag:
        splited_tag = tag.split('>')
        if len(splited_tag)>1:
            tweets.append(splited_tag[1])

count = 0
for tweet in tweets:
    count += 1
    print(tweet+"\n\n")

print(count)
