import requests as req
import json
import os
from bs4 import BeautifulSoup as bs

from dotenv import load_dotenv
load_dotenv()


# departments = ['AE','AG','AI','AR','AT','BE','BM','BS','BT','CD','CE','CH','CL','CR','CS','CY','DE','DH','EC','EE','EF','ES','ET','FA','GG','GS','HS','ID','IM','IP','IT','KS','MA','ME','MI','MM','MS','MT','NA','NT','PH','RD','RE','RJ','RT','RX','SE','SH','SL','TS','WM']
departments=['CH']
url = "https://erp.iitkgp.ac.in/Acad/timetable_track.jsp?action=second&dept="

headers ={
    "Connection" : "keep-alive",
    "Cookie": os.getenv('COOKIE')
}

courses = {}

def fetch_courses():
    for dept in departments:
        r = req.post(url+dept,headers=headers)
        html = bs(r.text, 'html.parser')
        subjects_div = html.findAll("td")
        arr= subjects_div[7:]
        i = 7
        while True:
            try:
                course_code = subjects_div[i].text
                name = subjects_div[i+1].text
                prof = subjects_div[i+2].text 
                ltp = subjects_div[i+3].text
                i+=4
                # print(subjects_div[i].text)
                if subjects_div[i].text[0:2]==dept and len(subjects_div[i].text)>2 and (subjects_div[i].text[2]=='1' or subjects_div[i].text[2]=='2' or subjects_div[i].text[2]=='3' or subjects_div[i].text[2]=='4' or subjects_div[i].text[2]=='5' or subjects_div[i].text[2]=='6' or subjects_div[i].text[2]=='7' or subjects_div[i].text[2]=='8'):
                    credits =0
                else :
                    credits=subjects_div[i].text
                    i+=1
                if subjects_div[i].text[0:2]==dept and len(subjects_div[i].text)>2 and (subjects_div[i].text[2]=='1' or subjects_div[i].text[2]=='2' or subjects_div[i].text[2]=='3' or subjects_div[i].text[2]=='4' or subjects_div[i].text[2]=='5' or subjects_div[i].text[2]=='6' or subjects_div[i].text[2]=='7' or subjects_div[i].text[2]=='8'):
                    slot = '-'
                else :
                    slot = subjects_div[i].text
                    i+=1
                
                if dept =='EE':
                    if (subjects_div[i].text[0:2] == dept or subjects_div[i].text[0:2]=='IE' ) and len(subjects_div[i].text)>2 and (subjects_div[i].text[2]=='1' or subjects_div[i].text[2]=='2' or subjects_div[i].text[2]=='3' or subjects_div[i].text[2]=='4' or subjects_div[i].text[2]=='5' or subjects_div[i].text[2]=='6' or subjects_div[i].text[2]=='7' or subjects_div[i].text[2]=='8'):
                        room = ""
                    else :
                        room = subjects_div[i].text
                        i+=1
                elif dept =='GG':
                    if (subjects_div[i].text[0:2] == dept or subjects_div[i].text[0:2]=='EX' ) and len(subjects_div[i].text)>2 and (subjects_div[i].text[2]=='1' or subjects_div[i].text[2]=='2' or subjects_div[i].text[2]=='3' or subjects_div[i].text[2]=='4' or subjects_div[i].text[2]=='5' or subjects_div[i].text[2]=='6' or subjects_div[i].text[2]=='7' or subjects_div[i].text[2]=='8'):
                        room = ""
                    else :
                        room = subjects_div[i].text
                        i+=1
                elif dept =='IM':
                    if (subjects_div[i].text[0:2] == dept or subjects_div[i].text[0:2]=='QE' or subjects_div[i].text[0:2]=='QM') and len(subjects_div[i].text)>2 and (subjects_div[i].text[2]=='1' or subjects_div[i].text[2]=='2' or subjects_div[i].text[2]=='3' or subjects_div[i].text[2]=='4' or subjects_div[i].text[2]=='5' or subjects_div[i].text[2]=='6' or subjects_div[i].text[2]=='7' or subjects_div[i].text[2]=='8'):
                        room = ""
                    else :
                        room = subjects_div[i].text
                        i+=1
                elif dept == 'GS':
                    if (subjects_div[i].text[0:2]=='TE' ) and len(subjects_div[i].text)>2 and (subjects_div[i].text[2]=='1' or subjects_div[i].text[2]=='2' or subjects_div[i].text[2]=='3' or subjects_div[i].text[2]=='4' or subjects_div[i].text[2]=='5' or subjects_div[i].text[2]=='6' or subjects_div[i].text[2]=='7' or subjects_div[i].text[2]=='8'):
                        room = ""
                    else :
                        room = subjects_div[i].text
                        i+=1
                elif dept == 'RJ':
                    if (subjects_div[i].text[0:2]=='EP' ) and len(subjects_div[i].text)>2 and (subjects_div[i].text[2]=='1' or subjects_div[i].text[2]=='2' or subjects_div[i].text[2]=='3' or subjects_div[i].text[2]=='4' or subjects_div[i].text[2]=='5' or subjects_div[i].text[2]=='6' or subjects_div[i].text[2]=='7' or subjects_div[i].text[2]=='8'):
                        room = ""
                    else :
                        room = subjects_div[i].text
                        i+=1
                else :
                    if subjects_div[i].text[0:2] == dept and len(subjects_div[i].text)==7 and (subjects_div[i].text[2]=='1' or subjects_div[i].text[2]=='2' or subjects_div[i].text[2]=='3' or subjects_div[i].text[2]=='4' or subjects_div[i].text[2]=='5' or subjects_div[i].text[2]=='6' or subjects_div[i].text[2]=='7' or subjects_div[i].text[2]=='8'):
                        room = ""
                    else :
                        room = subjects_div[i].text
                        i+=1

                courses[course_code]={
                    "name":name,
                    "professor":prof,
                    "l-t-p":ltp,
                    "credits":credits,
                    "slot":slot,
                    "room":room
                }
            except:
                print(dept + " - done")
                break
    


def make_json():
    jsonFile = open("CH.json", "w+")
    jsonFile.write(json.dumps(courses))
    jsonFile.close()


if __name__=="__main__":
    fetch_courses()
    make_json()