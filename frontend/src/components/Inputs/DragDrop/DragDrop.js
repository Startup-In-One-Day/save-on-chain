import React, {Component} from 'react';

//styles
import './DragDrop.css';

//functional imports
import FileDrop from 'react-file-drop';
import CryptoJS from 'crypto-js';

class DragDrop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            FileDropClassName: '',
            FileUploadMessage: 'Upload',
            hash: ''
        }

    }


    //the files are dragged over
    dragOver = (e) => {
        this.setState({FileUploadMessage: 'Upload this file?'});
    }
    dragOff = (e) => {
        this.setState({FileUploadMessage: 'Upload'});
    }

    //upload handler
    uploadFiles = (file, e) => {

        var reader = new FileReader();
        //reader.readAsText(file[0]);
        reader.readAsBinaryString(file[0]);

        //wait for the file to be read as binary
        reader.addEventListener('loadend', () => {
            //hash it using SHA256, this can easily change later
            var hash = CryptoJS.SHA256(CryptoJS.enc.Latin1.parse(reader.result));
            //get the hash value
            var hashValue = hash.toString(CryptoJS.enc.Hex);
            console.log(hashValue);
            this.setState({FileUploadMessage: file[0].name, hash: hashValue});
            //pass it up
            this.props.handleHashChange(hashValue);
        },false);

    }

    //render the filedrop
    render() {
        const {FileDropClassName, FileUploadMessage} = this.state;

        return(
            <div className='DragDrop'>
                <FileDrop className={FileDropClassName} onDrop={this.uploadFiles} onDragOver={this.dragOver} onDragLeave={this.dragOff}>
                    {FileUploadMessage}
                </FileDrop>
            </div>
        );
    }
}

export default DragDrop;
