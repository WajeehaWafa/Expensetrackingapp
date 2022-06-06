import React, { useContext, Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./Ex.css";

function ExpenseTracker() {
  const [blnc, setblnc] = useState();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [amountType, setAmountType] = useState("");
  const [transId, setTransId] = useState("");

  const [amountFilterType, setAmountFilterType] = useState("");

  const [isCreated, setIsCreated] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!name || !amount || !amountType) {
        alert("Kindly Fill Data or correct Your Data...");
        return;
      }

      let user = JSON.parse(localStorage.getItem("userDetails"));

      const token = user[0].token;

      const { data } = await axios.post(
        "https://expense-kamran.herokuapp.com/budget/create",
        {
          name: name,
          amount: amount,
          amountType: amountType,
        },
        {
          headers: {
            authorization: `${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      alert("Budget Created Successfully...!!!");
      if (data?.savebudget) {
        setblnc({
          ...blnc,
          UserBudget: [...blnc?.UserBudget, data?.savebudget],
        });
      }

      // getUsers();
      setIsCreated(true);
      setName("");
      setAmount("");
      setAmountType("");
    } catch (err) {
      console.log("UnAuthorized");
      setIsCreated(false);
      console.log(err);
    }
  };
  let user = JSON.parse(localStorage.getItem("userDetails"));
  //console.log(user);
  const token = user[0].token;
  const id = user[0].id;

  async function getUsers() {
   await axios
      .get("https://expense-kamran.herokuapp.com/budget/get", {
        headers: {
          authorization: `${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      .then((response) => {
        setblnc(response.data);
      })
      .catch((err) => {
        console.log("Amount get UnAuthorized");
        console.log(err);
      });
  }

  const handleDel = async (trans) => {
    try {
      await axios.delete(
        `https://expense-kamran.herokuapp.com/budget/delete/${trans._id}`,

        {
          headers: {
            authorization: `${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const UserBudget = blnc?.UserBudget.filter((p) => p._id !== trans._id);
      setblnc({ ...blnc, UserBudget });
      alert("Budget Deleted Successfully...!!!");
      getUsers();
    } catch (err) {
      console.log("UnAuthorized");
      console.log(id);
      console.log(err);
    }
  };

  const handleUpdateBtn = (trans) => {
    setIsUpdate(true);
    setTransId(trans._id);
    setName(trans.name);
    setAmount(trans.amount);
    setAmountType(trans.amountType);
  };

  const handleEdit = async (event) => {
    try {
      event.preventDefault();
      await axios.patch(
        `https://expense-kamran.herokuapp.com/budget/update/${transId}`,
        {
          name,
          amount,
          amountType,
        },
        {
          headers: {
            authorization: `${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      alert("Budget Updated Successfully...!!!");
      handleCancel();
      getUsers();
    } catch (err) {
      console.log("err::", err);
      console.log("UnAuthorized");
    }
  };
  const handleCancel = () => {
    getUsers();
    setIsUpdate(false);
    setName("");
    setAmount("");
    setAmountType("");
  };

  const handleEarningfilter = async (type) => {
    let filterdata = [];
    
    if (type === "earning") {
      console.log("befor earning");
      axios
      .get("https://expense-kamran.herokuapp.com/budget/get", {
        headers: {
          authorization: `${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
       // let filterdata = [];
        filterdata = response.data.UserBudget.filter(
          (userBudget) => userBudget.amountType === "earning"
        );
        setblnc({
          UserBudget: filterdata,
        });
      });

      
      console.log("after earning");
      // // filterdata = blnc?.UserBudget?.filter(() => amountType === "earning");
      // filterdata = blnc?.UserBudget.filter(
      //   (userBudget) => userBudget.amountType === type
      // )
    } else if (type === "expense") {
      console.log("befor expense");
      axios
      .get("https://expense-kamran.herokuapp.com/budget/get", {
        headers: {
          authorization: `${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        filterdata = response.data.UserBudget.filter(
          (userBudget) => userBudget.amountType === "expense"
        );
        setblnc({
          UserBudget: filterdata,
        });
        console.group(blnc);
      });
      console.log("after expnse");
    }
    else {
      getUsers();
      
      console.log("all");
    }
  
    // console.log(filterdata);
    // setblnc({
    //   TotalBudget: 0,
    //   TotalEarnings: 0,
    //   TotalExpense: 0,
    //   UserBudget: filterdata,
    // });
    //getUsers();
    
  };

  useEffect(() => {
    getUsers();
  }, [isCreated]);

  return (
    <div className="container-sm container-md container-lg container-xl bg-info">
      <div className="text-center">
        <h1 className="f">Expense Tracking APP</h1>
      </div>
      <div className="row align-item-center">
        <h4 className=" pad-15px text-color f">
          Your Balance <br />
          <span className="font-size-30px darkcyan">${blnc?.TotalBudget}</span>
        </h4>
        <div className="col-12 col-lg-6">
          <h3 className="h">Add New Data</h3>
          <div>
            <form onSubmit={isUpdate ? handleEdit : handleSubmit} action="">
              <div className="row mb-3">
                <label for="inputName1" className="col-sm-4 col-form-label h">
                  Title
                </label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    name="name"
                    placeholder="Type title Name"
                    value={name}
                    type="text"
                    required
                    onChange={(ev) => setName(ev.target.value)}
                  ></input>
                </div>
              </div>

              <div className="row mb-3">
                <label for="inputAmount1" className="col-sm-4 col-form-label h">
                  Ammount
                </label>
                <div className="col-sm-8">
                  <input
                    type="Number"
                    name="amount"
                    placeholder="Type Amount Here"
                    value={amount}
                    className="form-control"
                    required
                    onChange={(ev) => setAmount(ev.target.value)}
                  ></input>
                </div>
              </div>
              <fieldset className="row mb-3">
                <legend className="col-form-label col-sm-4 pt-0 h">Type</legend>
                <div className="col-sm-6">
                  <div className="form-check">
                    <input
                      className="form-check-input cursor-pointer"
                      type="radio"
                      name="amountType"
                      id="earning"
                      value={amountType}
                      checked={amountType === "earning"}
                      required
                      onClick={() => setAmountType("earning")}
                    ></input>
                    <label className="form-check-label h" htmlFor="earning">
                      Earning
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input curser-pointer"
                      type="radio"
                      name="amountType"
                      id="Expense"
                      value={amountType}
                      checked={amountType === "expense"}
                      required
                      onClick={() => setAmountType("expense")}
                    ></input>
                    <label className="form-check-label h" for="gridRadios2">
                      Expenses
                    </label>
                  </div>
                </div>
              </fieldset>

              {isUpdate ? (
                <>
                  <button
                    className="pad-7px width-100 shadow bg-darkblue color-white curser-pointer border-none outline-none"
                    onClick={handleEdit}
                  >
                    Update Transaction
                  </button>

                  <button
                    className="pad-7px width-100 shadow color-white bg-danger curser-pointer border-none outline-none"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <input
                  className="pad-7px width-100 shadow bg-darkblue color-white curser-pointer border-none outline-none"
                  type="submit"
                  value="Add Transaction"
                />
              )}
            </form>
          </div>
        </div>
        <div className="col-12 col-lg-6 h">
          <h3>Expense Detail....</h3>
          <div>
            <br />
            <div className="container-sm container-md container-lg container-xl darrkred">
              {
                <div className=" row mb-7 bg-info">
                  <h5 className="text-color h">
                    Earning:
                    <span className="font-size-20px darkgreen">
                      ${blnc?.TotalEarnings}
                    </span>
                  </h5>
                  <h5 className="text-color h">
                    <br />
                    Expense:
                    <span className="font-size-20px darkred">
                      ${blnc?.TotalExpense}
                    </span>
                  </h5>
                </div>
              }
            </div>
            <br />
            <div className="col-12">
              <ul className="list-style-none">

              {/* <form onSubmit={() => handleEarningfilter(amountFilterType)}> */}
              <div className="form-check">
                  <input
                    className="form-check-input cursor-pointer"
                    type="radio"
                    name="amountFilterType"
                    id="all"
                    value={amountFilterType}
                    checked={amountFilterType === "all"}
                    required
                    onClick={() => handleEarningfilter("all")}
                  ></input>
                  <label className="form-check-label h" htmlFor="earn">
                    All
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input cursor-pointer"
                    type="radio"
                    name="amountFilterType"
                    id="earning"
                    value={amountFilterType}
                    checked={amountFilterType === "earning"}
                    required
                    onClick={() => handleEarningfilter("earning")}
                  ></input>
                  <label className="form-check-label h" htmlFor="earn">
                    Earning
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input cursor-pointer"
                    type="radio"
                    name="amountFilterType"
                    id="expense"
                    value={amountFilterType}
                    checked={amountFilterType === "expense"}
                    required
                    onClick={(ev) => handleEarningfilter("expense")}
                  ></input>
                  <label className="form-check-label h" htmlFor="earn">
                    Expense
                  </label>
                </div>
                {/* </form> */}
                <br/>



                <li
                  className={`flex f space-between pad-7px shadow bg-white margin-bottom-10px $`}
                >
                  {" "}
                  <span>Title</span>
                  <span>Amount</span>
                  <span>Type</span>
                  <span>Actions</span>
                </li>
                {blnc?.UserBudget.map((trans, index) => {
                  return (
                    <li
                      key={`${trans.id}-${index}`}
                      className={` flex space-between pad-7px shadow bg-white margin-bottom-10px ${
                        trans.amountType === "earning"
                          ? "income-border"
                          : "expense-border"
                      } `}
                    >
                      <span>{trans.name}</span>
                      <span>${trans.amount}</span>
                      <span>{trans.amountType}</span>
                      <span>
                        <span>
                          <button onClick={() => handleDel(trans)}>
                            Delete
                          </button>
                        </span>
                        <span>
                          <button onClick={() => handleUpdateBtn(trans)}>
                            Edit
                          </button>
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseTracker;
