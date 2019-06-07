import React from "react";
import defaultImage from "../Assets/img/default-avatar.png";
import "../Assets/_fileupload.scss"

class PictureUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imagePreviewUrl: defaultImage
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }


  handleSubmit(e) {
    e.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  }
  render() {
    return (
      <div className="picture-container">
        <div className="picture">
          <img
            src={this.props.imagePreviewUrl}
            className="picture-src"
            alt="..."
          />
          <input type="file" onChange={e => this.props.uploadFile(e)} />
        </div>
        <h6 className="description">Choose Picture</h6>
      </div>
    );
  }
}

export default PictureUpload;
