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

uploaded = 0

deleted = 0

def upload(img):
    global uploaded
    with open(img, 'rb') as f:  # 以二进制读取图片
        data = f.read()
        encodestr = base64.b64encode(data)

    #read time taken
    file = open(img, 'rb')
    tags = exifread.process_file(file)
    Date_Taken = str(tags.get('Image DateTime'))

    print("Uploading "+img)
    url = 'https://api.imgbb.com/1/upload'
    s = {'key': '2b2fce123b921d49f8ea2233a21eb6a9', 'image': encodestr, 'name': img}
    uploaded = uploaded + 1
    return requests.post(url, data=s)

def get_date(img):
    #read time taken
    file = open(img, 'rb')
    tags = exifread.process_file(file)
    return str(tags.get('Image DateTime'))



if __name__ == "__main__":
    print ("Database version : %s " % data)

    all_files = os.listdir(".")

    local_img = []
    for file in all_files:
        if file.lower().endswith(('.bmp', '.dib', '.png', '.jpg', '.jpeg', '.pbm', '.pgm', '.ppm', '.tif', '.tiff')):
            local_img.append(file)
    print(local_img)
    

    for image in local_img:
        #有Name但没有URL
        cursor.execute("SELECT * FROM momentPic WHERE Name = '%s' AND URL IS NULL"%image)
        result = cursor.fetchone()
        if result is not None:
            r = upload(image)
            Date_Taken = get_date(image)
            print("Image {} taken at {} uploaded, URL: {}".format(image, Date_Taken, r.json().get('data').get('url')))
            cursor.execute("DELETE FROM momentPic WHERE Name = '%s'"%image)
            cursor.execute("INSERT INTO momentPic (Name, URL, URL_small, Time, Date_Taken) VALUES ('{}', '{}','{}', NOW(4), '{}')".format(image, r.json().get('data').get('url'), r.json().get('data').get('display_url'), Date_Taken))
            db.commit()
            time = time + r.elapsed

        #没有Name也没有URL
        cursor.execute("SELECT * FROM momentPic WHERE Name = '%s'"%image)
        result = cursor.fetchone()
        if result is None:
        
            r = upload(image)
            Date_Taken = get_date(image)
            print("Image {} taken at {} uploaded, URL: {}".format(image, Date_Taken, r.json().get('data').get('url')))

            cursor.execute("INSERT INTO momentPic (Name, URL, URL_small, Time, Date_Taken) VALUES ('{}', '{}','{}', NOW(4), '{}')".format(image, r.json().get('data').get('url'), r.json().get('data').get('display_url'), Date_Taken))
            db.commit()
            time = time + r.elapsed


    cursor.execute("SELECT NAME FROM momentPic;")
    
    uploaded_img = []
    result = cursor.fetchone()
    while result is not None:
        for name in result:
            uploaded_img.append(name)
        result = cursor.fetchone()
    
    for image in uploaded_img:
        if image not in local_img:
            print("Deleting "+image)
            cursor.execute("DELETE FROM momentPic WHERE Name = '%s'"%image)
            db.commit()
            deleted = deleted + 1
            
    print("-----------------------------------------------------")
    if uploaded == 0:
        print("Nothing uploaded. The database is already up-to-date.")
    elif uploaded == 1:
        print("1 picture uploaded.")
    else:
        print("%d pictures uploaded."%uploaded)
    
    if deleted == 0:
        print("Nothing deleted.")
    elif deleted == 1:
        print("1 picture deleted.")
    else:
        print("%d pictures uploaded."%uploaded)

    # 关闭数据库连接
    db.close()

    end = datetime.datetime.now()
    time = time - start + end - start
    
    print("(%d.%d seconds)"%(time.seconds, time.microseconds))




