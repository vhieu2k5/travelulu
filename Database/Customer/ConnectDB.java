
package travelulu;
import java.sql.*;
public class ConnectDB {
    public static Connection getConnect(){
        Connection conn=null;
        try {
           String url = "jdbc:mysql://localhost:3306/customer";
            String user = "root";
            String pass = "quanganh01263360411";
            conn = DriverManager.getConnection(url,user,pass);
            System.out.println("Database connected successfully!");
        } catch (Exception e){
            System.out.println("Cannot connect to the database!");
        }
        return conn;
    }
    
}
