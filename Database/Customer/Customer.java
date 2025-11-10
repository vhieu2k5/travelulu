
package travelulu;

import java.io.Serializable;

public class Customer implements Serializable {

        private int id;
        public String username;
        public String firstName;
        public String lastName;
        public String email;
        public String phoneNumber;
        public String address;
        public String pass;
        public String sex;
        public String dob;
        public String[] allergies;
        public String cccd;

    public int getId() {
        return id;
    }

        public Customer(int id, String username, String firstName, String lastName, String email, String phoneNumber, String address, String pass, String sex, String dob, String[] allergies, String cccd) {
            this.id = id;
            this.username = username;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.address = address;
            this.pass = pass;
            this.sex = sex;
            this.dob = dob;
            this.allergies = allergies;
            this.cccd = cccd;
        }
        public String getInfor(){
            return id+", "+username+"-"+"firstName" + " "+lastName+" "+dob+" "+sex+" "
                   +email+" "+phoneNumber + " "+ address+ " "+" "+pass+"(This suppose to be hidden) "
                   +" "+cccd+"\n";
        }

    }

