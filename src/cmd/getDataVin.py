import base64
from hashlib import new
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.select import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
#
opts = Options()
opts.add_argument("window-size=1200x800")
opts.add_argument("user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/71.0.3578.80 Chrome/71.0.3578.80 Safari/537.36")

# path to driver
driver = webdriver.Chrome('./chromedriver.exe', options=opts)

# url
driver.get('https://dmsapp.dealercenter.net/home/postsignin')

user = "abeato"
password = open('env.txt').readline().strip()
# get username
input_user = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.XPATH, '//input[@id="username"]'))
)
#input_user = driver.find_element(By.XPATH, '//input[@id="username"]')

# get password
input_pass = driver.find_element(By.XPATH, '//input[@id="password"]')

#//*[@id="login"]
input_user.send_keys(user)
input_pass.send_keys(password)

# login button
boton = driver.find_element(By.XPATH, '//*[@id="login"]')
boton.click()

# link new vehicle
inventory = driver.find_element(By.XPATH, '//*[@id="SideNavigation"]/div/div[1]/a[3]/div[1]')
inventory.click()

# click in add new vehicle
new_vehicle = driver.find_element(By.XPATH, '//*[@id="SideNavigation"]/div/div[1]/a[3]/div[2]/span[2]')
#new_vehicle.click()

# New url for vin decoder
driver.get('https://dmsapp.dealercenter.net/Inventory/Vehicle/New')

# find element
input_vin = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.XPATH, '//*[@id="VehicleBuildSection"]/div[2]/div/div/div[1]/div/div[4]/div[3]/input'))
)

input_vin.send_keys('5FRYD4H41FB001804')
input_vin.send_keys(Keys.ENTER)

# execute next button
next_btn = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.XPATH, "//*[@class='at__inventory_trimquestion_button_next ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only']"))
)

next_btn.click()

# ----------------------------------------------------------------------------------------------------------------------
# GET VEHICLE DATA FROM HTML
# ----------------------------------------------------------------------------------------------------------------------

# Vehicle type
v_type = driver.find_element(By.XPATH, '//*[@id="VehicleBuildSection"]/div[2]/div[1]/div/div[1]/div/div[3]/div[2]/span/input').get_attribute("value")

# New / Used
new_used = driver.find_element(By.XPATH, '//*[@id="VehicleBuildSection"]/div[2]/div[1]/div/div[1]/div/div[3]/div[2]/span/input').get_attribute("value")

# Vin code

# year

# Make

# Model

# Trim

# Engine

# Transmission

# Driver Train

# Door

# Cilinder

# Body Type


# get data row
#//div[@class='mjs-cell-4 top-out-spacing full-spacing vehicle-build-bg']//span/input
selects = driver.find_elements(By.XPATH, "//div[@class='full-spacing'][1]/div[@class='mjs-row']/div/select")
count = 0

# list_s = driver.find_elements(By.XPATH, "//div[@class='full-spacing'][1]/div[@class='mjs-row']/div/select")

# for s in list_s:
    # op = s.first_selected_option
    # print(s)


#//div[@class='full-spacing'][1]/div[@class='mjs-row']/div/select[1]/option[2]
inputs_2 = driver.find_elements(
    By.XPATH, "//div[@class='full-spacing'][1]/div[@class='mjs-row']/div/select/option")#.get_attribute("text")


select = Select(driver.find_element(
    By.XPATH, "//div[@class='full-spacing'][1]/div[@class='mjs-row']/div/select"))

# select_opts = select.first_selected_option
for s in select:
    print(select.get_attribute("option"))

# for input in inputs_2:
#     print(input.get_attribute("text"))

