import time
import json
import sys
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

msg = sys.argv[1]
user = sys.argv[2]

jokes = [msg]

#options = Options()
options = webdriver.ChromeOptions()
#options.add_argument('--headless')
options.add_argument("--user-data-dir=chrome-data")
options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option('useAutomationExtension', False)
options.add_argument('--disable-infobars')
options.add_argument('--disable-extensions')
options.add_argument('--profile-directory=Default')
options.add_argument("--disable-plugins-discovery")
options.add_argument("--user-data-dir=C:/home/henry/app-data-browser/")   # setear ruta local path


driver = webdriver.Chrome('C:/Users/User/Downloads/chromedriver', options=options)

# driver.minimize_window()
driver.get('https://web.whatsapp.com')  # Already authenticated

time.sleep(10)
name = user

##################### Provide Recepient Name Here ###############################
driver.find_element_by_xpath("//*[@title='{0}']".format(name)).click()


for joke in jokes:
    driver.find_element_by_xpath('//*[@id="main"]/footer/div[1]/div[2]/div/div[2]').send_keys(joke)
    driver.find_element_by_xpath('//*[@id="main"]/footer/div[1]/div[3]/button/span').click()
    time.sleep(10)
print('ejecutando')
time.sleep(12)
driver.close()