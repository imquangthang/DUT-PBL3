import csv
import mysql.connector

def csv_mysql():
    # Kết nối tới cơ sở dữ liệu MySQL
    db_connection = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="",
        database="jobtop"
    )
    cursor = db_connection.cursor()

    # Đường dẫn tới file CSV
    csv_file_path = "job_listings.csv"

    # Mở file CSV và đọc dữ liệu
    with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
        csvreader = csv.reader(csvfile)
        next(csvreader)  # Bỏ qua dòng tiêu đề nếu có
        # Chèn dữ liệu vào cơ sở dữ liệu MySQL
        for row in csvreader:
            values = (
            row[0],  # title
            row[2],  # salary
            row[3],  # dateSub
            row[4],  # deadline
            row[5],  # address
            row[6],  # numberEmployee
            row[7],  # level
            row[8],  # description
            row[9],  # requirements
            row[10], # rights
            row[12]  # sourcePicture
            )
            sql = "INSERT INTO jobinfo (title, salary, dateSub, deadline, address, numberEmployee, level, description, requirements, rights, sourcePicture) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            # values = tuple(row)
            cursor.execute(sql, values)

    # Lưu các thay đổi và đóng kết nối
    db_connection.commit()
    cursor.close()
    db_connection.close()