import React, { Component } from "react";
import { jsPDF } from "jspdf";

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      ans: {},
      score: null,
      questions: [
        {
          id: 1,
          question: "What is React?",
          options: [
            "A JavaScript library for building user interfaces",
            "A CSS framework",
            "A database management system",
            "A web server",
          ],
          correctanswer: 1,
        },
        {
          id: 2,
          question: "Who developed React?",
          options: ["Google", "Facebook", "Microsoft", "Amazon"],
          correctanswer: 2,
        },
        {
          id: 3,
          question: "What is the primary purpose of React?",
          options: [
            "To handle HTTP requests",
            "To create dynamic web pages",
            "To style web pages",
            "To manage databases",
          ],
          correctanswer: 2,
        },
        {
          id: 4,
          question: "What is a React component?",
          options: [
            "A function or class that optionally accepts input and returns a React element",
            "A style sheet used in React applications",
            "A type of database in React",
            "A tool for routing in React",
          ],
          correctanswer: 1,
        },
        {
          id: 5,
          question:
            "Which of the following is used to handle side effects in React?",
          options: ["useState", "useEffect", "useContext", "useReducer"],
          correctanswer: 2,
        },
        {
          id: 6,
          question:
            "How can you pass data from a parent component to a child component?",
          options: [
            "Using props",
            "Using state",
            "Using events",
            "Using context",
          ],
          correctanswer: 1,
        },
        {
          id: 7,
          question: "What is JSX?",
          options: [
            "A syntax extension for JavaScript that looks similar to XML or HTML",
            "A programming language",
            "A database query language",
            "A version control system",
          ],
          correctanswer: 1,
        },
        {
          id: 8,
          question: "How do you create a React application?",
          options: [
            "Using `npm create-react-app`",
            "Using `npx create-react-app`",
            "Using `npm start`",
            "Using `npx start-react-app`",
          ],
          correctanswer: 2,
        },
        {
          id: 9,
          question: "What is the purpose of the `key` prop in React?",
          options: [
            "To uniquely identify elements in a list",
            "To add styles to an element",
            "To handle events in a component",
            "To manage state in a component",
          ],
          correctanswer: 1,
        },
        {
          id: 10,
          question:
            "Which method in a React class component is used to handle initial state?",
          options: [
            "componentDidMount",
            "render",
            "constructor",
            "componentWillUnmount",
          ],
          correctanswer: 3,
        },
        {
          id: 11,
          question: "What is the virtual DOM in React?",
          options: [
            "A programming concept where an ideal, or 'virtual', representation of a UI is kept in memory",
            "A type of database used in React applications",
            "A method for storing application data in React",
            "A tool for managing application state",
          ],
          correctanswer: 1,
        },
      ],
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    let updatedAns = { ...this.state.ans };
    updatedAns[name] = value;
    this.setState({ ans: updatedAns });
  };

  handleSubmit = () => {
    const { ans, questions } = this.state;
    let score = 0;

    questions.forEach((question) => {
      if (parseInt(ans[question.id]) === question.correctanswer) {
        score += 1;
      }
    });

    this.setState({ score });
  };

  downloadhandle = () => {
    const doc = new jsPDF();
    doc.setFont("cursive", "italic");
    doc.setTextColor("blue");
    doc.setFontSize("20");
    doc.text("Thank you for participating:", 60, 30);
    doc.setTextColor("orange");
    doc.setFont("cursive", "bold");
    doc.text(`Your score is: ${this.state.score}`, 70, 10);
    doc.save("score.pdf");
  };

  render() {
    // Define responsive styles
    const containerStyle = {
      backgroundColor: "aqua",
      border: "2px solid black",
      padding: "20px",
      borderRadius: "20px",
      maxWidth: "90%",
      margin: "20px auto",
      boxSizing: "border-box",
    };

    const questionStyle = {
      fontSize: "20px",
      wordWrap: "break-word",
    };

    const optionStyle = {
      display: "flex",
      alignItems: "center",
      height: "auto",
      padding: "10px",
      border: "1px solid #686868",
      borderRadius: "8px",
      marginBottom: "10px",
      fontSize: "16px",
      backgroundColor: "white",
      flexWrap: "wrap",
    };

    const responsiveButton = {
      width: "100%",
      maxWidth: "200px",
      fontSize: "16px",
      padding: "10px",
      margin: "10px auto",
      textAlign: "center",
    };

    return (
      <>
        <div style={containerStyle}>
          <h1 style={{ textAlign: "center", fontSize: "24px" }}>Quiz App</h1>
          <hr style={{ border: "5px solid #000000" }} />
          <ol>
            {this.state.questions &&
              this.state.questions.map((val) => (
                <li key={val.id}>
                  <p style={questionStyle}>{val.question}</p>
                  {val.options.map((option, index) => (
                    <div
                      key={index}
                      style={{
                        ...optionStyle,
                        backgroundColor:
                          this.state.ans[val.id] === option &&
                          this.state.ans[val.id] ===
                            val.options[val.correctanswer]
                            ? "green"
                            : this.state.ans[val.id] === option &&
                              this.state.ans[val.id] !==
                                val.options[val.correctanswer]
                            ? "red"
                            : "white",
                      }}
                    >
                      <input
                        type="radio"
                        name={val.id}
                        value={index + 1}
                        checked={this.state.ans[val.id] == index + 1}
                        onChange={this.handleChange}
                      />
                      <span style={{ marginLeft: "10px" }}>{option}</span>
                    </div>
                  ))}
                  <br />
                </li>
              ))}
          </ol>
          <div style={{ textAlign: "center" }}>
            <button className="btn btn-outline-dark" style={responsiveButton} onClick={this.handleSubmit}>
              Submit
            </button>
          </div>
          {this.state.score !== null && (
            <h2
              style={{
                textAlign: "center",
                fontSize: "18px",
                marginTop: "15px",
              }}
            >
              Your Score: {this.state.score} / {this.state.questions.length}
            </h2>
          )}
          <center>
            <button
              className="btn btn-outline-dark"
              style={{ ...responsiveButton, marginTop: "15px" }}
              onClick={() => {
                this.downloadhandle();
              }}
            >
              Download Score
            </button>
          </center>
        </div>
      </>
    );
  }
}

export default Quiz;
