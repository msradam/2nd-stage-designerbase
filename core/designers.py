import json, ast
import gspread
from oauth2client.service_account import ServiceAccountCredentials

scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('core/designerbase_secret.json', scope)
client = gspread.authorize(creds)
sheet = client.open('2s_designerbase').sheet1

print(sheet)

def get_designer_records():
    '''
    Returns designer records from the Google Sheet
    '''
    return sheet.get_all_records()

def store_designer(args):
    '''
    Parses Typeform response into a Designer schema, 
    then stores it in the Google Sheet 
    '''
    answer_list = ast.literal_eval(args["form_response"])["answers"]
    # If the user agrees with the disclaimer
    # we collect and store their responses in the Google Sheet
    first_name = answer_list[0]['text']
    last_name = answer_list[1]['text']
    email = answer_list[2]['email']
    class_year = answer_list[3]['number']
    try:
        design_choices = str(answer_list[4]['choices']['labels']).strip('[\']"').strip("'")
    except:
        design_choices = "None"
    try:
        specialized_choices = str(answer_list[5]['choices']['labels']).strip('[\']"')
    except:
        specialized_choices = "None"
    possible_assistant = str(answer_list[6]['boolean'])
    try:
        experience = answer_list[7]['text']
    except:
        experience = "None"
    try:
        more_info = answer_list[8]['text']
    except:
        more_info = "None"
    row = [first_name, last_name, email, class_year, design_choices, 
               specialized_choices, possible_assistant, experience, more_info ]
    if len(sheet.get_all_records()) == 0:
        index = 2
    else:
        index = len(sheet.get_all_records()) + 1
    sheet.insert_row(row, index)
    return row

