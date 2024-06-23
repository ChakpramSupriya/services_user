import { useState, useEffect } from "react";
import validator from "aadhaar-validator";
import Swal from "sweetalert2";

export default function DryCleaningApply() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [add, setAdd] = useState("");
  const [pin, setPin] = useState("");
  const [dis, setDis] = useState("");
  const [adhar, setAdhar] = useState("");
  const [gen, setGen] = useState("");
  const [date, setDate] = useState("");
  const alertThankYou = (e) => {
    e.preventDefault();

    // {
    //   "fullname":"Chabon",
    //   "age":"22",
    //   "email":"chabon@gmail.com",
    //   "phonenumber":"546877679",
    //   "address":"Top",
    //   "pincode":"795008",
    //   "district":"Imphal East",
    //   "aadhaarnumber":"12345678789",
    //   "gender":"Female"
    // }
    const dryclean = {
      fullname: name,
      age,
      email,
      phonenumber: phone,
      address: add,
      pincode: pin,
      district: dis,
      aadhaarnumber: adhar,
      gender: gen,
      date,
    };
    if (!validator.isValidNumber(adhar)) {
      Swal.fire({
        icon: "error",
        title: "Not a valid Addhar Number",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    console.log(dryclean);
    fetch("http://localhost:3000/dryclean/createDryclean", {
      method: "POST",
      body: JSON.stringify(dryclean),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          Swal.fire({
            icon: "error",
            title: data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        }
      });
    if (
      age === "" ||
      name === "" ||
      email === "" ||
      phone === "" ||
      add === "" ||
      pin === "" ||
      dis === "" ||
      adhar === "" ||
      gen === "" ||
      date === ""
    ) {
      return;
    }

    setName("");
    setAge("");
    setEmail("");
    setPhone("");
    setAdd("");
    setPin("");
    setDis("");
    setAdhar("");
    setGen("");
    setDate("");

    Swal.fire({
      title: "Thank You!",
      text: "Your details has been sucessfully submitted.Thanks!",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const districtPincode = [
    {
      district: "Imphal East",
      pincode: "795008",
    },
    {
      district: "Imphal West",
      pincode: "795001",
    },
    {
      district: "Thoubal",
      pincode: "795138",
    },
    {
      district: "Bishnupur",
      pincode: "795126",
    },
    {
      district: "Kakching",
      pincode: "795103",
    },
  ];

  useEffect(() => {
    console.log(dis);
    const pincode = districtPincode.filter(
      (eachDistrict) => eachDistrict.district === dis
    );
    // console.log(pincode[0]?.pincode);
    setPin(pincode[0]?.pincode);
  }, [dis]);

  return (
    // container
    <div className=" flex justify-center items-center bg-gradient-to-b from-[#380036] to-[#0CBABA]">
      <div className="my-4 max-w-[650px] p-[28px]  mr-7 ml-7 shadow-2xl shadow-black bg-purple-100 rounded-xl">
        <form>
          <h2 className="text-[26px] font-semibold text-center text-[#2f4f4f] pb-1 border-solid">
            Registration for Dry Cleaning
          </h2>
          <hr />
          {/* content */}
          <div className="flex flex-wrap justify-between pt-2 pb-2 pr-0 pl-0 mt-2">
            {/* input-box */}
            <div className="flex flex-wrap w-full sm:w-[50%] pb-4 justify-end">
              <label
                className="w-[95%] text-[#2f4f4f] font-bold mt-1 mb-1"
                htmlFor="name"
              >
                Full Name*
              </label>
              <input
                className="h-[40px] w-[95%] pt-0 pb-0 pr-[10px] pl-[10px] rounded-md border-solid border-[1px] outline-none"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                required
              />
            </div>

            <div className="flex flex-wrap w-full sm:w-[50%] pb-4 justify-end">
              <label
                className="w-[95%] text-[#2f4f4f] font-bold mt-1 mb-1"
                htmlFor="age"
              >
                Age*
              </label>
              <input
                className="h-[40px] w-[95%] pt-0 pb-0 pr-[10px] pl-[10px] rounded-md border-solid border-[1px] outline-none"
                type=""
                maxLength={3}
                placeholder="Enter Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                name="age"
                required
              />
            </div>

            <div className="flex flex-wrap w-full sm:w-[50%] pb-4 justify-end">
              <label
                className="w-[95%] text-[#2f4f4f] font-bold mt-1 mb-1"
                htmlFor="email"
              >
                Email*
              </label>
              <input
                className="h-[40px] w-[95%] pt-0 pb-0 pr-[10px] pl-[10px] rounded-md border-solid border-[1px] outline-none"
                type="email"
                placeholder="Enter valid email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required
              />
            </div>

            <div className="flex flex-wrap w-full sm:w-[50%] pb-4 justify-end">
              <label
                className="w-[95%] text-[#2f4f4f] font-bold mt-1 mb-1"
                htmlFor="phonenumber"
              >
                Phone Number*
              </label>
              <input
                className="h-[40px] w-[95%] pt-0 pb-0 pr-[10px] pl-[10px] rounded-md border-solid border-[1px] outline-none"
                type="tel"
                maxLength={10}
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                name="phoneNumber"
                required
              />
            </div>

            <div className="flex flex-wrap w-full sm:w-[50%] pb-4 justify-end">
              <label
                className="w-[95%] text-[#2f4f4f] font-bold mt-1 mb-1"
                htmlFor="address"
              >
                Address*
              </label>
              <input
                className="h-[40px] w-[95%] pt-0 pb-0 pr-[10px] pl-[10px] rounded-md border-solid border-[1px] outline-none"
                type="text"
                placeholder="Enter full Address"
                value={add}
                onChange={(e) => setAdd(e.target.value)}
                name="address"
                required
              />
            </div>

            {/* <div className="flex flex-wrap w-[50%] pb-4 justify-end">
              <label
                className="w-[95%] text-[#2f4f4f] font-bold mt-1 mb-1"
                htmlFor="district"
              >
                District*
              </label>
              <input
                className="h-[40px] w-[95%] pt-0 pb-0 pr-[10px] pl-[10px] rounded-md border-solid border-[1px] outline-none"
                type="text"
                placeholder="Enter District"
                value={dis}
                onChange={(e) => setDis(e.target.value)}
                name="district"
                required
              />
            </div> */}
            <div className="flex flex-wrap w-full sm:w-[50%] pb-4 justify-end">
              <label
                className="w-[95%] text-[#2f4f4f] font-bold mt-1 mb-1"
                for="services"
              >
                District*
              </label>

              <select
                onChange={(e) => setDis(e.target.value)}
                id="district"
                className="h-[40px] w-[95%] pt-0 pb-0 pr-[10px] pl-[10px] rounded-md border-solid border-[1px] outline-none"
              >
                <option value="district">Select District</option>
                {districtPincode.map((s, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <option key={i} value={s.district}>
                    {s.district}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap w-full sm:w-[50%] pb-4 justify-end">
              <label
                className="w-[95%] text-[#2f4f4f] font-bold mt-1 mb-1"
                htmlFor="pincode"
              >
                Pincode*
              </label>
              <input
                className="h-[40px] w-[95%] pt-0 pb-0 pr-[10px] pl-[10px] rounded-md border-solid border-[1px] outline-none"
                type=""
                placeholder="Enter Pincode"
                value={pin}
                maxLength={6}
                onChange={(e) => setPin(e.target.value)}
                name="pincode"
                required
              />
            </div>

            <div className="flex flex-wrap w-full sm:w-[50%] pb-4 justify-end">
              <label
                className="w-[95%] text-[#2f4f4f] font-bold mt-1 mb-1"
                htmlFor="aadhar"
              >
                Aadhaar Number*
              </label>
              <input
                className="h-[40px] w-[95%] pt-0 pb-0 pr-[10px] pl-[10px] rounded-md border-solid border-[1px] outline-none"
                type=""
                maxLength={12}
                placeholder="Enter Aadhaar Number"
                value={adhar}
                onChange={(e) => setAdhar(e.target.value)}
                name="aadhaar"
                required
              />
            </div>

            <div className="flex flex-wrap w-full sm:w-[50%] pb-4 justify-end">
              <label
                className="w-[95%] text-[#2f4f4f] font-bold mt-1 mb-1"
                htmlFor="date"
              >
                Date
              </label>
              <input
                className="h-[40px] w-[95%] pt-0 pb-0 pr-[10px] pl-[10px] rounded-md border-solid border-[1px] outline-none"
                type="date"
                placeholder="Enter date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                name="date"
                required
              />
            </div>

            {/* gender-title */}
            <span className="w-[95%] text-[#2f4f4f] font-bold mt-1 mb-1 text-[16px] pl-4 ">
              Gender
            </span>
            {/* gender-category */}
            <div className="text-gray pl-4">
              <input
                className="cursor-pointer"
                type="radio"
                name="gender"
                value="male"
                id="male"
                required
                checked={gen === "male"}
                onChange={(e) => setGen(e.target.value)}
              />
              <label
                className="pt-0 pr-16 pb-0 pl-[5px] text-[14px] cursor-pointer"
                htmlFor="gender"
              >
                Male
              </label>

              <input
                className="cursor-pointer"
                type="radio"
                name="gender"
                value="female"
                checked={gen === "female"}
                onChange={(e) => setGen(e.target.value)}
                id="female"
                required
              />
              <label
                className="pt-0 pr-16 pb-0 pl-[5px] text-[14px] cursor-pointer"
                htmlFor="gender"
              >
                Female
              </label>

              <input
                className="cursor-pointer"
                type="radio"
                name="gender"
                id="other"
                value="other"
                required
                checked={gen === "other"}
                onChange={(e) => setGen(e.target.value)}
              />
              <label
                className="pt-0 pr-5 pb-0 pl-[5px] text-[14px] cursor-pointer"
                htmlFor="gender"
              >
                Other
              </label>
            </div>
          </div>

          {/* button-container */}
          <div className="m-[15px 0]">
            <button
              className="w-full mt-[10px] p-[10px] block text-[20px] text-white border-none rounded-xl h-14 bg-gradient-to-r from-purple-500 to-pink-50 hover:from-pink-500 hover:to-purple-500 hover:font-semibold"
              type="submit"
              onClick={alertThankYou}
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
