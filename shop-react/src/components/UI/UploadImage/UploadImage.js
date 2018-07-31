import React, {Component} from 'react';
import { Upload, Button, Icon, message,Row } from 'antd';
import axios from 'axios';

class UploadImage extends Component{
    state = {
        fileList: [],
        uploading: false,
        image:null,
        CLOUDINARY_UPLOAD_PRESET : 'rm5cugae',
        CLOUDINARY_UPLOAD_URL : 'https://api.cloudinary.com/v1_1/productimage/image/upload'
      }
      handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
          formData.append('file', file);
          formData.append('upload_preset', this.state.CLOUDINARY_UPLOAD_PRESET);

        });
    
        this.setState({
          uploading: true,
        });
        axios.post(this.state.CLOUDINARY_UPLOAD_URL,formData)
             .then(resp=>{
                this.props.setImageUrl(resp.data.secure_url);
                this.setState({
                    fileList: [],
                    uploading: false,
                  });
             })
             .catch(err=>{
                console.log(err);
             })
      }
      render() {
        const { uploading } = this.state;
        const props = {
          action: this.state.CLOUDINARY_UPLOAD_URL,
          onRemove: (file) => {
            this.setState(({ fileList }) => {
              const index = fileList.indexOf(file);
              const newFileList = fileList.slice();
              newFileList.splice(index, 1);
              return {
                fileList: newFileList,
                image:null
              };
            });
          },
          beforeUpload: (file) => {
            this.setState((fileList) => ({
              fileList: [...fileList, file],
            }));
            this.setState({
              image: URL.createObjectURL(file)
            })
            return false;
          },
          fileList: this.state.fileList,
        };
        let image=null;
        if(this.state.image){
          image=<img style={{maxWidth:'250px', minWidth:'250px'}} alt="example" src={this.state.image}/>;
        }
        return (
          <div>
           <Row>
            {image}
           </Row>
           <Row>
              <Upload {...props}  style={{marginTop:'16px'}}>
                <Button>
                  <Icon type="upload" /> Select File
                </Button>
              </Upload>
              <Button
                style={{marginTop:'16px'}}
                type="primary"
                onClick={this.handleUpload}
                disabled={this.state.fileList.length === 0}
                loading={uploading}
              >
                {uploading ? 'Uploading' : 'Start Upload' }
              </Button>
            </Row>
          </div>
        );
      }
}

export default UploadImage;