import sqlite3
import os

conn = sqlite3.connect('Pandemic_data.db')
c = conn.cursor() # The database will be saved in the location where your 'py' file is saved

# Create table - PANDEMICS
# 'Pandemic', 'Country', 'Year', 'Cases', 'Deaths', 'Lon', 'Lat', 'population'
c.execute('''CREATE TABLE PANDEMICS
             ([generated_id] INTEGER PRIMARY KEY,[Pandemic] text, [Year] integer, [Cases] integer, [Deaths] integer, [Lon] real, [Lat] real, [population] integer)''')
                          
conn.commit()

# Note that the syntax to create new tables should only be used once in the code (unless you dropped the table/s at the end of the code). 
# The [generated_id] column is used to set an auto-increment ID for each record
# When creating a new table, you can add both the field names as well as the field formats (e.g., Text)