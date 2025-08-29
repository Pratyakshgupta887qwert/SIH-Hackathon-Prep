import React from "react"
const Student = () =>{
    
  const List = [
    { "id": "BTECH-CS3-001", "name": "Aarav Sharma", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023001" },
    { "id": "BTECH-CS3-002", "name": "Vivaan Singh", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023002" },
    { "id": "BTECH-CS3-003", "name": "Aditya Kumar", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023003" },
    { "id": "BTECH-CS3-004", "name": "Vihaan Gupta", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023004" },
    { "id": "BTECH-CS3-005", "name": "Arjun Patel", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023005" },
    { "id": "BTECH-CS3-006", "name": "Sai Reddy", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023006" },
    { "id": "BTECH-CS3-007", "name": "Reyansh Jain", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023007" },
    { "id": "BTECH-CS3-008", "name": "Krishna Verma", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023008" },
    { "id": "BTECH-CS3-009", "name": "Ishaan Mehra", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023009" },
    { "id": "BTECH-CS3-010", "name": "Ayaan Khan", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023010" },
    { "id": "BTECH-CS3-011", "name": "Ananya Sharma", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023011" },
    { "id": "BTECH-CS3-012", "name": "Diya Patel", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023012" },
    { "id": "BTECH-CS3-013", "name": "Saanvi Singh", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023013" },
    { "id": "BTECH-CS3-014", "name": "Myra Gupta", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023014" },
    { "id": "BTECH-CS3-015", "name": "Aadhya Kumar", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023015" },
    { "id": "BTECH-CS3-016", "name": "Kiara Reddy", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023016" },
    { "id": "BTECH-CS3-017", "name": "Pari Jain", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023017" },
    { "id": "BTECH-CS3-018", "name": "Riya Verma", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023018" },
    { "id": "BTECH-CS3-019", "name": "Siya Mehra", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023019" },
    { "id": "BTECH-CS3-020", "name": "Navya Khan", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023020" },
    { "id": "BTECH-CS3-021", "name": "Kabir Sharma", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023021" },
    { "id": "BTECH-CS3-022", "name": "Zayn Singh", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023022" },
    { "id": "BTECH-CS3-023", "name": "Dhruv Kumar", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023023" },
    { "id": "BTECH-CS3-024", "name": "Ryan Gupta", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023024" },
    { "id": "BTECH-CS3-025", "name": "Atharv Patel", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023025" },
    { "id": "BTECH-CS3-026", "name": "Aarush Reddy", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023026" },
    { "id": "BTECH-CS3-027", "name": "Veer Jain", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023027" },
    { "id": "BTECH-CS3-028", "name": "Advik Verma", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023028" },
    { "id": "BTECH-CS3-029", "name": "Laksh Mehra", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023029" },
    { "id": "BTECH-CS3-030", "name": "Dev Khan", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023030" },
    { "id": "BTECH-CS3-031", "name": "Zara Sharma", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023031" },
    { "id": "BTECH-CS3-032", "name": "Shanaya Patel", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023032" },
    { "id": "BTECH-CS3-033", "name": "Anika Singh", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023033" },
    { "id": "BTECH-CS3-034", "name": "Amaira Gupta", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023034" },
    { "id": "BTECH-CS3-035", "name": "Eva Kumar", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023035" },
    { "id": "BTECH-CS3-036", "name": "Ira Reddy", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023036" },
    { "id": "BTECH-CS3-037", "name": "Kimaya Jain", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023037" },
    { "id": "BTECH-CS3-038", "name": "Mahi Verma", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023038" },
    { "id": "BTECH-CS3-039", "name": "Neha Mehra", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023039" },
    { "id": "BTECH-CS3-040", "name": "Tara Khan", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023040" },
    { "id": "BTECH-CS3-041", "name": "Rohan Sharma", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023041" },
    { "id": "BTECH-CS3-042", "name": "Arnav Singh", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023042" },
    { "id": "BTECH-CS3-043", "name": "Yash Kumar", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023043" },
    { "id": "BTECH-CS3-044", "name": "Aryan Gupta", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023044" },
    { "id": "BTECH-CS3-045", "name": "Pranav Patel", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023045" },
    { "id": "BTECH-CS3-046", "name": "Ishan Reddy", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023046" },
    { "id": "BTECH-CS3-047", "name": "Kian Jain", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023047" },
    { "id": "BTECH-CS3-048", "name": "Shaurya Verma", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023048" },
    { "id": "BTECH-CS3-049", "name": "Neel Mehra", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023049" },
    { "id": "BTECH-CS3-050", "name": "Samar Khan", "year": 3, "branch": "Computer Science", "enrollmentNumber": "CS2023050" }
  ]

     

    return (
        <>
           <h1 className="text-2xl font-bold text-center">Students List</h1>
        {
            List.map((val) =>{
                return(
                        
                   <div className="flex border-2 flex-col gap-5">
                 
                     <div className="w-full flex flex-col gap-2 border-2 p-2 rounded-md ">
                        <h1>Student Id : {val.id}</h1>
                        <h1>Student Name : {val.name}</h1>
                        <h1>Branch : {val.branch}</h1>
                        <h1>Enrollment Number : {val.enrollmentNumber}</h1>
                        <h1>Year : {val.year}</h1>
                    </div>
                   </div>
                )
            })
        }
     </>
    )
}

export default Student;