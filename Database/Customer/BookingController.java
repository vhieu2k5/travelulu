
package travelulu;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class BookingController {
    List<Booking> listOfBooking = new ArrayList<>();
    public void FakeDulieu(){
         // --- Static fake data seed (sample 100 records) ---
        listOfBooking.add(new Booking("HL001", 2, "Ha Long Bay Cruise", "Pending"));
        listOfBooking.add(new Booking("SP002", 2, "Sapa Trek", "Confirmed"));
        listOfBooking.add(new Booking("DN003", 3, "Da Nang Beach Tour", "Completed"));
        listOfBooking.add(new Booking("PQ004", 4, "Phu Quoc Island", "Pending"));
        listOfBooking.add(new Booking("HU005", 5, "Hue Ancient City", "Cancelled"));
        listOfBooking.add(new Booking("NB006", 6, "Ninh Binh River Tour", "Confirmed"));
        listOfBooking.add(new Booking("MD007", 7, "Mekong Delta Adventure", "Completed"));
        listOfBooking.add(new Booking("HN008", 8, "Hanoi City Tour", "Pending"));
        listOfBooking.add(new Booking("SG009", 9, "Saigon Food Tour", "Confirmed"));
        listOfBooking.add(new Booking("CC010", 11, "Cu Chi Tunnel Trip", "Completed"));
        listOfBooking.add(new Booking("HL011", 11, "Ha Long Bay Cruise", "Pending"));
        listOfBooking.add(new Booking("SP012", 12, "Sapa Trek", "Confirmed"));
        listOfBooking.add(new Booking("DN013", 13, "Da Nang Beach Tour", "Pending"));
        listOfBooking.add(new Booking("PQ014", 14, "Phu Quoc Island", "Cancelled"));
        listOfBooking.add(new Booking("HU015", 15, "Hue Ancient City", "Completed"));
        listOfBooking.add(new Booking("NB016", 16, "Ninh Binh River Tour", "Pending"));
        listOfBooking.add(new Booking("MD017", 17, "Mekong Delta Adventure", "Confirmed"));
        listOfBooking.add(new Booking("HN018", 18, "Hanoi City Tour", "Pending"));
        listOfBooking.add(new Booking("SG019", 19, "Saigon Food Tour", "Completed"));
        listOfBooking.add(new Booking("CC020", 20, "Cu Chi Tunnel Trip", "Confirmed"));

        listOfBooking.add(new Booking("HL021", 21, "Ha Long Bay Cruise", "Confirmed"));
        listOfBooking.add(new Booking("SP022", 22, "Sapa Trek", "Completed"));
        listOfBooking.add(new Booking("DN023", 23, "Da Nang Beach Tour", "Cancelled"));
        listOfBooking.add(new Booking("PQ024", 24, "Phu Quoc Island", "Pending"));
        listOfBooking.add(new Booking("HU025", 25, "Hue Ancient City", "Confirmed"));
        listOfBooking.add(new Booking("NB026", 26, "Ninh Binh River Tour", "Pending"));
        listOfBooking.add(new Booking("MD027", 27, "Mekong Delta Adventure", "Completed"));
        listOfBooking.add(new Booking("HN028", 28, "Hanoi City Tour", "Pending"));
        listOfBooking.add(new Booking("SG029", 29, "Saigon Food Tour", "Cancelled"));
        listOfBooking.add(new Booking("CC030", 30, "Cu Chi Tunnel Trip", "Confirmed"));

        listOfBooking.add(new Booking("HL031", 31, "Ha Long Bay Cruise", "Completed"));
        listOfBooking.add(new Booking("SP032", 32, "Sapa Trek", "Pending"));
        listOfBooking.add(new Booking("DN033", 33, "Da Nang Beach Tour", "Confirmed"));
        listOfBooking.add(new Booking("PQ034", 34, "Phu Quoc Island", "Pending"));
        listOfBooking.add(new Booking("HU035", 35, "Hue Ancient City", "Cancelled"));
        listOfBooking.add(new Booking("NB036", 36, "Ninh Binh River Tour", "Confirmed"));
        listOfBooking.add(new Booking("MD037", 37, "Mekong Delta Adventure", "Pending"));
        listOfBooking.add(new Booking("HN038", 38, "Hanoi City Tour", "Completed"));
        listOfBooking.add(new Booking("SG039", 2, "Saigon Food Tour", "Confirmed"));
        listOfBooking.add(new Booking("CC040", 40, "Cu Chi Tunnel Trip", "Pending"));

        listOfBooking.add(new Booking("HL041", 41, "Ha Long Bay Cruise", "Confirmed"));
        listOfBooking.add(new Booking("SP042", 42, "Sapa Trek", "Pending"));
        listOfBooking.add(new Booking("DN043", 43, "Da Nang Beach Tour", "Completed"));
        listOfBooking.add(new Booking("PQ044", 44, "Phu Quoc Island", "Cancelled"));
        listOfBooking.add(new Booking("HU045", 45, "Hue Ancient City", "Completed"));
        listOfBooking.add(new Booking("NB046", 46, "Ninh Binh River Tour", "Pending"));
        listOfBooking.add(new Booking("MD047", 7, "Mekong Delta Adventure", "Confirmed"));
        listOfBooking.add(new Booking("HN048", 48, "Hanoi City Tour", "Completed"));
        listOfBooking.add(new Booking("SG049", 49, "Saigon Food Tour", "Pending"));
        listOfBooking.add(new Booking("CC050", 50, "Cu Chi Tunnel Trip", "Confirmed"));

        listOfBooking.add(new Booking("HL051", 3, "Ha Long Bay Cruise", "Pending"));
        listOfBooking.add(new Booking("SP052", 2, "Sapa Trek", "Confirmed"));
        listOfBooking.add(new Booking("DN053", 3, "Da Nang Beach Tour", "Completed"));
        listOfBooking.add(new Booking("PQ054", 4, "Phu Quoc Island", "Pending"));
        listOfBooking.add(new Booking("HU055", 5, "Hue Ancient City", "Cancelled"));
        listOfBooking.add(new Booking("NB056", 6, "Ninh Binh River Tour", "Confirmed"));
        listOfBooking.add(new Booking("MD057", 7, "Mekong Delta Adventure", "Completed"));
        listOfBooking.add(new Booking("HN058", 8, "Hanoi City Tour", "Pending"));
        listOfBooking.add(new Booking("SG059", 9, "Saigon Food Tour", "Confirmed"));
        listOfBooking.add(new Booking("CC060", 20, "Cu Chi Tunnel Trip", "Completed"));

        listOfBooking.add(new Booking("HL061", 11, "Ha Long Bay Cruise", "Pending"));
        listOfBooking.add(new Booking("SP062", 12, "Sapa Trek", "Confirmed"));
        listOfBooking.add(new Booking("DN063", 13, "Da Nang Beach Tour", "Pending"));
        listOfBooking.add(new Booking("PQ064", 14, "Phu Quoc Island", "Cancelled"));
        listOfBooking.add(new Booking("HU065", 15, "Hue Ancient City", "Completed"));
        listOfBooking.add(new Booking("NB066", 16, "Ninh Binh River Tour", "Pending"));
        listOfBooking.add(new Booking("MD067", 17, "Mekong Delta Adventure", "Confirmed"));
        listOfBooking.add(new Booking("HN068", 58, "Hanoi City Tour", "Pending"));
        listOfBooking.add(new Booking("SG069", 19, "Saigon Food Tour", "Completed"));
        listOfBooking.add(new Booking("CC070", 20, "Cu Chi Tunnel Trip", "Confirmed"));

        listOfBooking.add(new Booking("HL071", 21, "Ha Long Bay Cruise", "Confirmed"));
        listOfBooking.add(new Booking("SP072", 22, "Sapa Trek", "Completed"));
        listOfBooking.add(new Booking("DN073", 23, "Da Nang Beach Tour", "Cancelled"));
        listOfBooking.add(new Booking("PQ074", 24, "Phu Quoc Island", "Pending"));
        listOfBooking.add(new Booking("HU075", 25, "Hue Ancient City", "Confirmed"));
        listOfBooking.add(new Booking("NB076", 26, "Ninh Binh River Tour", "Pending"));
        listOfBooking.add(new Booking("MD077", 27, "Mekong Delta Adventure", "Completed"));
        listOfBooking.add(new Booking("HN078", 28, "Hanoi City Tour", "Pending"));
        listOfBooking.add(new Booking("SG079", 29, "Saigon Food Tour", "Cancelled"));
        listOfBooking.add(new Booking("CC080", 30, "Cu Chi Tunnel Trip", "Confirmed"));

        listOfBooking.add(new Booking("HL081", 31, "Ha Long Bay Cruise", "Completed"));
        listOfBooking.add(new Booking("SP082", 32, "Sapa Trek", "Pending"));
        listOfBooking.add(new Booking("DN083", 33, "Da Nang Beach Tour", "Confirmed"));
        listOfBooking.add(new Booking("PQ084", 34, "Phu Quoc Island", "Pending"));
        listOfBooking.add(new Booking("HU085", 35, "Hue Ancient City", "Cancelled"));
        listOfBooking.add(new Booking("NB086", 36, "Ninh Binh River Tour", "Confirmed"));
        listOfBooking.add(new Booking("MD087", 37, "Mekong Delta Adventure", "Pending"));
        listOfBooking.add(new Booking("HN088", 58, "Hanoi City Tour", "Completed"));
        listOfBooking.add(new Booking("SG089", 39, "Saigon Food Tour", "Confirmed"));
        listOfBooking.add(new Booking("CC090", 40, "Cu Chi Tunnel Trip", "Pending"));

        listOfBooking.add(new Booking("HL091", 41, "Ha Long Bay Cruise", "Confirmed"));
        listOfBooking.add(new Booking("SP092", 42, "Sapa Trek", "Pending"));
        listOfBooking.add(new Booking("DN093", 43, "Da Nang Beach Tour", "Completed"));
        listOfBooking.add(new Booking("PQ094", 44, "Phu Quoc Island", "Cancelled"));
        listOfBooking.add(new Booking("HU095", 45, "Hue Ancient City", "Completed"));
        listOfBooking.add(new Booking("NB096", 46, "Ninh Binh River Tour", "Pending"));
        listOfBooking.add(new Booking("MD097", 47, "Mekong Delta Adventure", "Confirmed"));
        listOfBooking.add(new Booking("HN098", 48, "Hanoi City Tour", "Completed"));
        listOfBooking.add(new Booking("SG099", 49, "Saigon Food Tour", "Pending"));
        listOfBooking.add(new Booking("CC100", 58, "Cu Chi Tunnel Trip", "Confirmed"));
    }
    public List<Booking> inspectCustomer(int id){
        return listOfBooking.stream().filter((Booking b)->b.CusId==id).collect(Collectors.toList());
    }
}
