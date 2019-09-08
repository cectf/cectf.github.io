import * as React from "react";
import * as Modal from "react-modal";
import service from "services";
import { ChallengeStub } from "types";

interface AdminChallengeTileProps {
  modalOpen: boolean;
  onModalClose: () => void;
  onSubmit: (challenge: ChallengeStub) => void;
  challenge?: ChallengeStub;
}
interface AdminChallengeTileState {
  message: string;
  title: string;
  category: string;
  body: string;
  hint: string;
  solution: string;
}

export default class CreateChallengeModal extends React.Component<
  AdminChallengeTileProps,
  AdminChallengeTileState
> {
  constructor(props: AdminChallengeTileProps, state: AdminChallengeTileState) {
    super(props, state);
    if (this.props.challenge) {
      this.state = {
        message: "",
        title: this.props.challenge.title,
        category: this.props.challenge.category,
        body: this.props.challenge.body,
        hint: this.props.challenge.hint,
        solution: this.props.challenge.solution
      };
    } else {
      this.state = {
        message: "",
        title: "",
        category: "",
        body: "",
        hint: "",
        solution: ""
      };
    }
    this.onChange_title = this.onChange_title.bind(this);
    this.onChange_category = this.onChange_category.bind(this);
    this.onChange_body = this.onChange_body.bind(this);
    this.onChange_hint = this.onChange_hint.bind(this);
    this.onChange_solution = this.onChange_solution.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange_title(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ title: event.target.value });
  }
  onChange_category(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ category: event.target.value });
  }
  onChange_body(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ body: event.target.value });
  }
  onChange_hint(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ hint: event.target.value });
  }
  onChange_solution(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ solution: event.target.value });
  }
  onSubmit(event: React.FormEvent) {
    event.preventDefault();
    event.stopPropagation();
    service.challengesAdmin.createChallenge(this.state).then(() => {
      this.props.onModalClose();
    });
  }
  render() {
    return (
      <Modal
        isOpen={this.props.modalOpen}
        onRequestClose={this.props.onModalClose}
      >
        <div>
          <form onSubmit={this.onSubmit}>
            <div>
              Title:
              <input
                type="text"
                id="title"
                value={this.state.title}
                onChange={this.onChange_title}
              />
            </div>
            <div>
              Category:
              <input
                type="text"
                id="category"
                value={this.state.category}
                onChange={this.onChange_category}
              />
            </div>
            <div>
              Body:
              <input
                type="text"
                id="body"
                value={this.state.body}
                onChange={this.onChange_body}
              />
            </div>
            <div>
              Hint:
              <input
                type="text"
                id="hint"
                value={this.state.hint}
                onChange={this.onChange_hint}
              />
            </div>
            <div>
              Solution:
              <input
                type="text"
                id="solution"
                value={this.state.solution}
                onChange={this.onChange_solution}
              />
            </div>
            <div className="modal__message">{this.state.message}</div>
            <button type="submit" id="submit">
              Submit
            </button>
          </form>
        </div>
        <button onClick={this.props.onModalClose}>Close</button>
      </Modal>
    );
  }
}
