#!/usr/bin/python
# -*- coding: UTF-8 -*-

import MySQLdb
import base64
import requests
import datetime
import os
import exifread

start = datetime.datetime.now()
time = datetime.datetime.now()
# 打开数据库连接
db = MySQLdb.connect("localhost", "chengkai", "1212", "myWeb", charset='utf8' )

# 使用cursor()方法获取操作游标 
cursor = db.cursor()

# 使用execute方法执行SQL语句
cursor.execute("SELECT VERSION();")

# 使用 fetchone() 方法获取一条数据
data = cursor.fetchone()

print ("Database version : %s " % data)

all_files = os.listdir(".")

img_files = []
for file in all_files:
    if file.lower().endswith(('.bmp', '.dib', '.png', '.jpg', '.jpeg', '.pbm', '.pgm', '.ppm', '.tif', '.tiff')):
        img_files.append(file)
print(img_files)

for image in img_files:
    cursor.execute("SELECT * FROM momentPic WHERE Name = '%s'"%image)
    if cursor.fetchone() is None:
        with open(image, 'rb') as f:  # 以二进制读取图片
            data = f.read()
            encodestr = base64.b64encode(data)

        #read time taken
        file = open(image, 'rb')
        tags = exifread.process_file(file)
        Date_Taken = str(tags.get('Image DateTime'))

        
        url = 'https://api.imgbb.com/1/upload'
        s = {'key': '2b2fce123b921d49f8ea2233a21eb6a9', 'image': encodestr, 'name': image}
        r = requests.post(url, data=s)
        print("Image {} taken at {} uploaded, URL: {}".format(image, Date_Taken, r.json().get('data').get('url')))
        cursor.execute("INSERT INTO momentPic (Name, URL, Time, Date_Taken) VALUES ('{}', '{}', NOW(4), '{}')".format(image, r.json().get('data').get('url'), Date_Taken))
        db.commit()
        time = time + r.elapsed

#Base64 encode image
with open('_DSF2379_1.JPG', 'rb') as f:  # 以二进制读取图片
    data = f.read()
    encodestr = base64.b64encode(data)

# 关闭数据库连接
db.close()

end = datetime.datetime.now()
time = time - start + end - start
print("(%d.%d seconds)"%(time.seconds, time.microseconds))
