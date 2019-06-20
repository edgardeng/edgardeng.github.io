import random
import pymongo
from faker import Faker, Factory
fake = Factory.create()

hobbies = ["football", "basketball", "skate", "dance", "sing", "paint", "tennis"]
areas = ["Y.P", "J.D", "B.S", "X.H", "H.P", "J.A", "Q.P", "J.S", "H.K", "P.D"]
grades = ["G.One", "G.Two", "G.Three", "G.Four", "G.Five", "G.Six", "G.Seven", "G.Eight", "G.Nine"]


def create_data():
    db_client = pymongo.MongoClient("mongodb://127.0.0.1:27017")
    database = db_client["db_test"]
    collection = database["student"]
    for i in range(200):
        student = {
            "name": fake.name(),
            "age": random.randint(1, 20),
            "grade": random.choice(grades),
            "gender": random.randint(0, 1),
            "results": [
                {"subject": "Math", "score": random.randint(20, 100)},
                {"subject": "Science", "score": random.randint(10, 100)}
            ],
            "hobby": random.sample(hobbies, 2),
            "home": {
                "area": random.choice(areas),
                "address": fake.address(),
                "location": [120 + random.random(), 30 + random.random()],
            }
        }
        collection.insert_one(student)


def aggregation_test():
    db_client = pymongo.MongoClient("mongodb://127.0.0.1:27017")
    db = db_client["db_test"]
    # 男女分布
    pipeline = [
        {"$project": {"_id": 1, "age": 1, "gender": 1}},
        {"$group": {
            "_id": "$gender",
            "count": {"$sum": 1},
            "avg_age": {"$avg": "$age" }
        }}
    ]
    print('get gender count & average age')
    result_gender = list(db.student.aggregate(pipeline))
    for r in result_gender:
        print(r)
    # 地区 男女 分布
    pipeline2 = [
        {"$group": {
            "_id": {"area": "$home.area", "gender": "$gender"},
            "count": {"$sum": 1}
        }}
    ]
    print('get area gender count')
    home_gender = list(db.student.aggregate(pipeline2))
    for r in home_gender:
        print(r)
    # 人数最多和最少的地区
    pipeline3 = [
        {"$group": {
            "_id": {"area": "$home.area"},
            "count": {"$sum": 1}
        }},
        {"$sort": {"count": 1}},
        {"$group": {
            "_id": "",
            "minArea": {"$first": "$_id.area"}, "minCount": {"$first": "$count"},
            "maxArea": {"$last": "$_id.area"}, "maxCount": {"$last": "$count"}
        }},
    ]
    print('get home_count')
    home_count = list(db.student.aggregate(pipeline3))
    for r in home_count:
        print(r)
    # 前三的兴趣爱好
    pipeline4 = [
        {"$unwind": "$hobby"},
        {"$group": {
            "_id": {"area": "$hobby"},
            "count": {"$sum": 1}
        }},
        {"$project": {"area": "$_id.area", "_id": 0, "count": 1}},
        {"$sort": {"count": -1}},
        {"$limit": 3},
    ]
    print('get hobby top 3')
    hobby_top = list(db.student.aggregate(pipeline4))
    for r in hobby_top:
        print(r)
    # 平均成绩前三的学生
    pipeline5 = [
        {"$unwind": "$results"},
        {"$group": {
            "_id": "$name",
            "score": {"$avg": "$results.score"}
        }},
        {"$sort": {"score": -1}},
        {"$limit": 3},
    ]
    print('---  get score top 3')
    result_top = list(db.student.aggregate(pipeline5))
    for r in result_top:
        print(r)


if __name__ == '__main__':
    # create_data()
    aggregation_test()