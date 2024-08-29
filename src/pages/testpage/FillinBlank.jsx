import React, { Component } from 'react'
import { Row } from "react-bootstrap";
import "../../assets/css/pages.css";
import { connect } from 'react-redux';
import { count_attempts, decr_counter, incr_counter, set_counter_zero, update_answer_data, update_question_data } from "../../Redux_two/Actions/ActionCreator";

const mapStateToProps = (state) => {
    return {
        IncrementDecrement: state.IncrementDecrement,
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        incr_counter: (count) => { dispatch(incr_counter(count)) },
        decr_counter: (count) => { dispatch(decr_counter(count)) },
        set_counter_zero: (count) => { dispatch(set_counter_zero(count)) },
        update_question_data: (qData) => { dispatch(update_question_data(qData)) },
        update_answer_data: (data) => { dispatch(update_answer_data(data)) },
        count_attempts: (data) => { dispatch(count_attempts(data)) },
    }
};

class FillinBlank extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Questions: [],
            questionsFullForm: '',
            firstAnswer: '',
            secondAnswer: '',
            firstAnswerId: '',
            secondAnswerId: '',
            question: '',
            AnswerOneFilled: false,
            questionsData: '',
            questionDataResponse: this.props.IncrementDecrement.questions,
            subject_background: '',
            text_color: props.textColor,
            button_color: props.buttonColor,
            option_color: props.optionColor,
            selected_option_color: props.selectedOptionColor,
            questionList: [props.questionList],
            answerForSubmit: []
        }
    }

    componentDidMount() {
        this.setState({ AnswerOneFilled: false })

        let questionDataResponse = [...this.state.questionDataResponse];

        for (let qdata of questionDataResponse) {
            if (qdata.id === this.state.questionList[0].id) {
                qdata.selectedOptionId = (qdata.selectedOptionId == null) ? ['', ''] : qdata.selectedOptionId;
                this.setState({ firstAnswerId: qdata.selectedOptionId[0].option_id, firstAnswer: qdata.selectedOptionId[0].value })
                this.setState({ secondAnswerId: qdata.selectedOptionId[1].option_id, secondAnswer: qdata.selectedOptionId[1].value })
            }
        }
        this.setState({ questionDataResponse });

        this.setState({
            questionsData: this.state.questionList[0], Questions: this.state.questionList[0],
            question: this.state.questionList[0].question, questionsFullForm: this.state.questionList[0].break_question
        })

        setTimeout(() => {
            this.props.update_question_data(this.state.questionList[0].id)
            this.props.update_answer_data("")
        }, 300);
    }

    handleAnswer = (item, index, oid, qid, data) => {
        let answers = [...this.state.answerForSubmit];
        answers[0] = oid;

        let questionDataResponse = [...this.state.questionDataResponse];

        for (let qdata of questionDataResponse) {
            if (qdata.id === qid) {
                qdata.selectedOptionId[0] = data;
            }
        }

        this.setState({ questionDataResponse, answerForSubmit: answers }, () => {
            this.props.update_answer_data(this.state.answerForSubmit)
            this.props.count_attempts(1);
        });

        if (this.state.firstAnswer === '') {
            this.setState({ firstAnswer: item, firstAnswerId: oid, AnswerOneFilled: true })
        } else {
            this.setState({ firstAnswer: item, firstAnswerId: oid, AnswerOneFilled: true })
        }
    }

    handleAnswer2 = (item, index, oid, qid, data) => {
        let answers = [...this.state.answerForSubmit];
        answers[1] = oid;

        let questionDataResponse = [...this.state.questionDataResponse];

        for (let qdata of questionDataResponse) {
            if (qdata.id === qid) {
                qdata.selectedOptionId[1] = data;
            }
        }

        this.setState({ questionDataResponse, answerForSubmit: answers }, () => {
            this.props.update_answer_data(this.state.answerForSubmit)
            this.props.count_attempts(1);
        });

        if (this.state.secondAnswer === '') {
            this.setState({ secondAnswer: item, secondAnswerId: oid, AnswerOneFilled: true })
        } else {
            this.setState({ secondAnswer: item, secondAnswerId: oid, AnswerOneFilled: true })
        }
    }

    checkFill = (item, index, oid, qid, data) => {
        if (this.state.questionsFullForm.length > 2 & this.state.AnswerOneFilled) {
            this.handleAnswer2(item, index, oid, qid, data)
        } else {
            this.handleAnswer(item, index, oid, qid, data)
        }
    }

    render() {
        return (
            <div className="container-fluid col-12 col-sm-12 col-md-6 col-lg-12 mt-3 justify-content-center m-auto">
                <form className="form">
                    <div className="container-fluid p-3 mb-5">
                        <div className="row">
                            <div className="counselling-Form col-12 col-sm-12 col-md-12 col-lg-12 mt-5 ">
                                <h3 style={{ color: "black"}}>
                                    {this.state.questionsFullForm[0] === "" ?
                                        (
                                            <span>
                                                <input
                                                    type="text"
                                                    value={this.state.firstAnswer}
                                                    className="form-control-input border-bottom"
                                                    style={{
                                                        borderColor: this.state.button_color,
                                                        borderStyle: "none",
                                                        backgroundColor: "transparent",
                                                        textAlign: 'center',
                                                        width: "30%",
                                                    }}
                                                />
                                            </span>
                                        ) :
                                        (
                                            <span>{this.state.questionsFullForm[0]}</span>
                                        )}
                                    {this.state.questionsFullForm[0] !== "" ?
                                        (
                                            <span>
                                                <input
                                                    type="text"
                                                    value={this.state.firstAnswer}
                                                    className="form-control-input border-bottom"
                                                    style={{
                                                        borderColor: this.state.button_color,
                                                        borderStyle: "none",
                                                        backgroundColor: "transparent",
                                                        textAlign: 'center',
                                                        width: "30%",
                                                    }}
                                                />
                                            </span>
                                        ) : null}
                                    {this.state.questionsFullForm[1] === "" ? null : (
                                        <span>{this.state.questionsFullForm[1]}</span>
                                    )}
                                    {this.state.questionsFullForm[1] !== "" && this.state.questionsFullForm.length > 2 ?
                                        (
                                            <span>
                                                <input
                                                    type="text"
                                                    value={this.state.secondAnswer}
                                                    className="form-control-input border-bottom"
                                                    style={{
                                                        borderColor: this.state.button_color,
                                                        backgroundColor: "transparent",
                                                        textAlign: 'center',
                                                        borderStyle: "none",
                                                        width: "auto",
                                                    }}
                                                />
                                            </span>
                                        ) : null}
                                    {this.state.questionsFullForm[2] === "" ? null : (
                                        <span>{this.state.questionsFullForm[2]}</span>
                                    )}
                                </h3>
                            </div>

                            <div className="col-12">
                                <Row>
                                    {this.state.questionList[0].option.map((data, index) => (
                                        <div md={3} className=" col-lg-6 col-sm-12 mt-3" key={data.option_id}>
                                            <button
                                                onClick={() => this.checkFill(data.value, index, data.option_id, this.state.questionList[0].id, data)}
                                                className="buttons col-12 col-sm-12 col-md-12 col-lg-12 p-3"
                                                type="button"
                                                style={{
                                                    color: this.state.text_color,
                                                    backgroundColor:
                                                        this.state.firstAnswerId === data.option_id
                                                            ? this.state.selected_option_color
                                                            : this.state.secondAnswerId === data.option_id
                                                                ? this.state.selected_option_color
                                                                : "#000084",
                                                }}
                                            >
                                                <UnsafeComponent html={data.value} />
                                            </button>
                                        </div>
                                    ))}
                                </Row>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

function UnsafeComponent({ html }) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(FillinBlank);
