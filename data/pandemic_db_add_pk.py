import sqlite3
import os

conn = sqlite3.connect('Pandemic_data.sqlite')
c = conn.cursor() # The database will be saved in the location where your 'py' file is saved

# Create table - pandemics
# 'Pandemic', 'Country', 'Year', 'Cases', 'Deaths', 'Lon', 'Lat', 'population'
#c.execute('''CREATE TABLE pandemics
#             ([id] INTEGER PRIMARY KEY,[Pandemic] text, [Country] text, [Year] integer, [Cases] integer, [Deaths] integer, [Lon] real, [Lat] real, [population] integer)''')

PRAGMA foreign_keys=off;

BEGIN TRANSACTION;

ALTER TABLE pandemics RENAME TO old_table;

CREATE TABLE pandemics
(
  id integer NOT NULL,
  Pandemic VARCHAR NOT NULL,
  Country VARCHAR,
  Year INTEGER,
  Cases INTEGER,
  Deaths INTEGER,
  Lon REAL,
  Lat REAL,
  population INTEGER,
  CONSTRAINT pandemic_pk PRIMARY KEY (id)
);

INSERT INTO pandemics SELECT * FROM old_table;

COMMIT;

PRAGMA foreign_keys=on;                          
conn.commit()

# Note that the syntax to create new tables should only be used once in the code (unless you dropped the table/s at the end of the code). 
# The [generated_id] column is used to set an auto-increment ID for each record
# When creating a new table, you can add both the field names as well as the field formats (e.g., Text)