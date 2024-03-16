from time import sleep
import sys
import json

from simulator import *
from communication import *

COMPANIES_JSON = "data/companies.json"

def main(limit):
    
    simulatorEvent = Event_Simulator()
    
    if limit:
        limit = int(limit)
    else:
        limit = 0
    
    # receiver = Receiver()Company
    sender = Sender()

    try:
        with open(COMPANIES_JSON, 'r') as f:
            data = json.load(f)
    except:
        print('Error opening {} file. Exiting...'.format(COMPANIES_JSON))
        exit(1)
    

    # Companies
    for key, value in data.items():
        company = Company(key, value[0])
        simulatorEvent.add_company(company)
        json_data = json.dumps({'type': 'company_created', 'company': company.toDic()})
        sender.send(json_data)

    
    counter = 0
    # Events loop
    while(limit == 0 or counter < limit):
        counter += 1
        messages = simulatorEvent.run()
        json_data = json.dumps(messages)
        print(json_data)
        
        sender.send(json_data)        
        # for m in messages:
        #     sender.send(m)

if __name__ == '__main__':
    if len(sys.argv) == 1:
        main(None)
    main(sys.argv[1])