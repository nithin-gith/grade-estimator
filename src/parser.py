import json
from re import I

file =open('new_courses.json')
courses_data = json.load(file)
courses_list = []


#to parse the normal json to array of objects which has unique id(used for mapping in react)
def parse_courses():
    i =1
    for code in courses_data:
        course={}
        course['id']=i
        i+=1
        course['course_code']=code
        course['name']=courses_data[code]['name']
        course['professor']=courses_data[code]['professor']
        course['credits']=courses_data[code]['credits']
        course['l-t-p']=courses_data[code]['l-t-p']
        course['slot']=courses_data[code]['slot']
        course['room']=courses_data[code]['room']
        courses_list.append(course)

#to make json file from list
def make_json():
    jsonFile = open("courses_data_for_react.json", "w+")
    jsonFile.write(json.dumps(courses_list))
    jsonFile.close()


if __name__ =="__main__":
    parse_courses()
    make_json()