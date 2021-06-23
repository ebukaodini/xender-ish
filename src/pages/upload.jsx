import React, { Component } from "react";
import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";
import { ArrowLeft, ArrowRight, Check, CheckSquare, File, FileText, Image, Loader, Lock, Music, Plus, UserCheck, Video, X } from "react-feather";
import Layout from "../components/layout";
import '../scss/upload.scss';

class Upload extends Component {

  pages = [
    'NEW_UPLOAD',
    'ADDING_FILES',
    'META_INFO',
    'UPLOADING'
  ];

  state = {
    // general
    page: this.pages[0],
    // upload file section
    totalFileSizeAllowed: 1000, // in MB
    uploadFileSize: 0, // in MB
    uploadedFiles: [],
    canProgress: false,
    // meta info section
    senderEmail: '',
    maxRecipients: 5,
    recipients: [],
    sender: '',
    errmsg: '',
    downloadLink: false,
    secureTransfer: false,
    isSendingToken: false,
    canResendToken: false,
    tokenIsSent: false,
    isVerifyingToken: false,
    emailIsVerified: false,
    canUpload: false,
    // uploading
    isUploading: false,
    isSending: false,
    uploadProgress: 0,
    sent: false
  }

  async componentDidMount() {
    // this.handleSend()
  }

  handleFileInput = async (e) => {
    e.preventDefault();

    if (e.target.files.length === 0) return;

    await this.setState({ uploadedFiles: [...this.state.uploadedFiles, ...e.target.files] });

    // update file size
    let size = 0;
    await this.state.uploadedFiles.forEach((file) => {
      file.icon = this.getIconType(file.type)
      size += this.convertToMb(file.size);
    });
    this.setState({ uploadFileSize: size, page: this.pages[1] });
    document.getElementById('hidden_upload_field').value = '';
    this.setState({ canProgress: this.canProgress() });
    this.scrollToBottom();
  };

  handleRemoveFile = async (index) => {
    this.state.uploadedFiles.splice(index, 1);
    await this.setState({ uploadFiles: this.state.uploadedFiles });
    // update file size
    let size = 0;
    await this.state.uploadedFiles.forEach((file) => {
      file.icon = this.getIconType(file.type)
      size += this.convertToMb(file.size);
    });

    this.setState({ uploadFileSize: size });
    this.setState({ canProgress: this.canProgress() });
  }

  handleNext = (e) => {
    e.preventDefault();
    this.state.canProgress && this.setState({ page: this.pages[2] });
  }

  handlePrevious = (e) => {
    e.preventDefault();
    this.setState({ page: this.pages[1] });
  }

  canProgress = () => {
    return this.state.uploadFileSize <= this.state.totalFileSizeAllowed && this.state.uploadedFiles.length > 0;
  }

  scrollToBottom = () => {
    let bottom = document.querySelector('.add_files');
    bottom != null && bottom.scrollIntoView();
  }

  convertToMb = (size) => (size / 1000) / 1000;

  getIconType = (filetype) => {
    if (/application\//gi.exec(filetype) !== null) return 'FILE';
    else if (/video\//gi.exec(filetype) !== null) return 'VIDEO';
    else if (/image\//gi.exec(filetype) !== null) return 'IMAGE';
    else if (/audio\//gi.exec(filetype) !== null) return 'AUDIO';
    else if (/text\//gi.exec(filetype) !== null) return 'TEXT';
    else return 'FILE';
  };

  handleEmailFrom = (e) => {
    // if (e.target.value.length > 0) {
    this.setState({ senderEmail: e.target.value });
    if (e.target.value.length === 0)
      this.setState({ errmsg: 'Enter a valid email' });
  }

  handleAddRecipient = (e) => {
    e.preventDefault();
    if (this.state.recipients.length < this.state.maxRecipients) {
      this.setState({ recipients: [...this.state.recipients, e.target[0].value] })
      e.target[0].value = '';
      this.setState({ errmsg: '' })
    } else {
      this.setState({ errmsg: `You can only send to ${this.state.maxRecipients} recipients!` })
    }
  }

  handleRemoveRecipient = (index) => {
    this.state.recipients.splice(index, 1);
    this.setState({ recipients: this.state.recipients });
  }

  handleDownloadLink = (e) => {
    this.setState({ downloadLink: !this.state.downloadLink });
  }

  handleSecureTransfer = (e) => {
    this.setState({ secureTransfer: !this.state.secureTransfer });
  }

  handleSendToken = (e) => {
    e.preventDefault();
    if (this.state.senderEmail.length > 0) {
      this.setState({ isSendingToken: true });
      setTimeout(() => {
        this.setState({ tokenIsSent: true, isSendingToken: false });

        setTimeout(() => {
          // resend token
          this.setState({ tokenIsSent: false, canResendToken: true })
        }, 2000)
      }, 2000);
      this.setState({ errmsg: '' })
    } else {
      this.setState({ errmsg: 'Enter a valid email' })
    }

  }

  handleVerifyToken = (e) => {
    e.preventDefault();
    this.setState({ isVerifyingToken: true })
    if (e.target[1].value.length === 6) {
      e.target[0].value = '';
      this.setState({ emailIsVerified: true, errmsg: '' })
    } else {
      this.setState({ errmsg: `Invalid verification token!` })
    }
  }

  canSend = () => {
    return this.state.emailIsVerified === true && (this.state.recipients.length > 0 || this.state.downloadLink);
  }

  handleSend = (e) => {
    // e.preventDefault();
    this.setState({ page: this.pages[3], isUploading: true })
    let i = setInterval(() => {
      this.state.uploadProgress < 100 && this.setState({ uploadProgress: this.state.uploadProgress + 10 })

      if (this.state.uploadProgress === 100) {
        this.setState({ isUploading: false, isSending: true })
        this.uploadComplete()
        clearInterval(i);
      }
    }, 1000);
  }

  uploadComplete = () => {
    setTimeout(() => {
      this.setState({ isSending: false, sent: true })
    }, 3000);
  }

  handleSendAgain = () => {
    this.setState({
      page: this.pages[0],
      uploadFileSize: 0, // in MB
      uploadedFiles: [],
      canProgress: false,
      // meta info section
      senderEmail: '',
      recipients: [],
      sender: '',
      errmsg: '',
      downloadLink: false,
      secureTransfer: false,
      isSendingToken: false,
      canResendToken: false,
      tokenIsSent: false,
      isVerifyingToken: false,
      emailIsVerified: false,
      canUpload: false,
      // uploading
      isUploading: false,
      isSending: false,
      uploadProgress: 0,
      sent: false
    })
  }

  handleFileDragOver = (e) => {
    e.preventDefault();
  }

  handleFileDrop = async (e) => {
    e.preventDefault()

    await this.setState({ uploadedFiles: [...this.state.uploadedFiles, ...e.dataTransfer.files] });

    // update file size
    let size = 0;
    await this.state.uploadedFiles.forEach((file) => {
      file.icon = this.getIconType(file.type)
      size += this.convertToMb(file.size);
    });
    this.setState({ uploadFileSize: size, page: this.pages[1] });
    document.getElementById('hidden_upload_field').value = '';
    this.setState({ canProgress: this.canProgress() });
    this.scrollToBottom();
  }

  render() {

    return (
      <Layout>
        <section className='upload_page'>
          <input multiple={true} onChange={this.handleFileInput} id='hidden_upload_field' className='hidden_upload_field' type="file" />

          {
            this.state.page === this.pages[0] &&
            <div className='new_upload' onDragOver={this.handleFileDragOver} onDrop={this.handleFileDrop} >
              <button className='add_new_file'>
                <label htmlFor="hidden_upload_field">
                  <Plus size='40' />
                </label>
              </button>
              <label htmlFor="hidden_upload_field" className='upload_instructions'>
                <span>Add your files here</span>
                <span>OR</span>
                <span>Drag and drop them here</span>
                <span>{process.env.NODE_ENV}: {process.env.REACT_APP_BASEURL}</span>
              </label>
            </div>
          }

          {
            this.state.page === this.pages[1] &&
            <div className='adding_files'>
              <div className='uploaded_files_details'>

                <ul className='uploaded_files'>
                  {
                    this.state.uploadedFiles.map((file, index) => (
                      <div key={index}>
                        <li>
                          <div>
                            <div className='file_name'>{file.name}</div>
                            <div className='file_size_and_icon'>
                              <span className='file_size'>{this.convertToMb(file.size).toFixed(1)}MB</span>
                              <span className='file_icon'>
                                {file.icon === 'AUDIO' && <Music size='15' />}
                                {file.icon === 'IMAGE' && <Image size='15' />}
                                {file.icon === 'VIDEO' && <Video size='15' />}
                                {file.icon === 'TEXT' && <FileText size='15' />}
                                {file.icon === 'FILE' && <File size='15' />}
                              </span>
                            </div>
                          </div>
                          <button className='remove_file' onClick={() => this.handleRemoveFile(index)}><X size='15' /></button>
                        </li>
                        <hr />
                      </div>
                    ))
                  }
                </ul>

                {
                  this.state.uploadFileSize <= this.state.totalFileSizeAllowed &&
                  <div className='add_files' onDragOver={this.handleFileDragOver} onDrop={this.handleFileDrop}>
                    <button className='add_new_file'>
                      <label htmlFor="hidden_upload_field">
                        <Plus size='20' />
                      </label>
                    </button>
                    <div className='upload_instructions'>
                      <label htmlFor="hidden_upload_field">
                        <span>Add more files here</span>
                        <span>OR drag and drop them here</span>
                      </label>
                    </div>
                  </div>
                }

              </div>

              <div className='status_bar'>

                <div className='filesize_progress_bar' title={Math.round((this.state.uploadFileSize / this.state.totalFileSizeAllowed) * 100) + '%'}>
                  <div className='progress_bar'>
                    <div className='progress_indicator' style={{
                      width: `${Math.round((this.state.uploadFileSize / this.state.totalFileSizeAllowed) * 100)}%`
                    }}></div>
                    <div className='progress_percentage'>
                      {this.state.uploadFileSize.toFixed(1)}MB
                    </div>
                  </div>
                  <div className='filesize_progress_label'>{Math.round(this.state.totalFileSizeAllowed / 1000)}GB</div>
                </div>

                <div className='error_msg'>
                  {
                    this.state.uploadFileSize > this.state.totalFileSizeAllowed &&
                    <small>You can only upload 1GB of filesize at a time!</small>
                  }
                </div>

                <div className='status_footer'>
                  <span className='no_files'>
                    {this.state.uploadedFiles.length} file{this.state.uploadedFiles.length > 1 && 's'} added
                  </span>

                  <button onClick={this.handleNext} disabled={!this.state.canProgress}>
                    <ArrowRight size='20' className={this.state.canProgress === false ? 'disabled' : ''} />
                  </button>
                </div>

              </div>
            </div>
          }

          {
            this.state.page === this.pages[2] &&
            <div className='meta_info'>
              <div className='meta_form'>

                <div className='meta_fields'>

                  <div className='sender'>
                    <label htmlFor="sender">Email from</label>
                    <input onChange={this.handleEmailFrom} readOnly={this.state.isSendingToken} type='email' className='sender' id='sender' />
                  </div>

                  <div className='recipient'>
                    <ul className='recipientlist'>
                      {
                        this.state.recipients.map((email, index) => (
                          <li key={index} className={this.state.downloadLink ? 'disabled' : ''}>{email} <span><X onClick={() => this.handleRemoveRecipient(index)} size='14' /></span></li>
                        ))
                      }
                    </ul>
                    <form action={null} onSubmit={this.handleAddRecipient}>
                      <label htmlFor="recipient">Email to</label> <br />
                      <small className='note'>Press enter after entering email.</small>
                      <input type='email' className='recipient' id='recipient' disabled={this.state.downloadLink} />
                    </form>
                  </div>

                  <div className='downloadlink'>
                    <div onClick={this.handleDownloadLink} className='downloadlink_checkbox'>
                      <CheckSquare size='14' className={this.state.downloadLink ? 'active' : ''} />
                      <span>Get download link instead</span>
                    </div>

                    <span onClick={this.handleSecureTransfer} title={this.state.secureTransfer === true ? 'Secured transfer' : 'Secure your transfer'}>
                      <Lock size='14' className={this.state.secureTransfer ? 'active' : ''} />
                    </span>
                  </div>

                  <div className='message'>
                    <label htmlFor="message">Message</label>
                    <textarea className='message' cols="30" rows="10" id='message'></textarea>
                  </div>

                  <div className='verify_email'>
                    <form action={null} onSubmit={this.handleVerifyToken}>

                      <label htmlFor="verify_token">
                        <span>Verify your email</span>
                        {
                          !this.state.emailIsVerified &&
                          <button disabled={this.state.isSendingToken || this.state.tokenIsSent} onClick={this.handleSendToken} type='button'>
                            {
                              this.state.isSendingToken ?
                                'Sending...' :
                                this.state.tokenIsSent ?
                                  'Sent' :
                                  this.state.canResendToken ?
                                    'Resend Token' :
                                    'Send token'
                            }
                          </button>
                        }
                      </label>

                      {
                        this.state.emailIsVerified ?
                          <div className='isverified'>
                            <UserCheck size='16' />
                            <span>Email is verified</span>
                          </div> :
                          <>
                            <input readOnly={(!this.state.tokenIsSent && !this.state.canResendToken) || this.state.isSendingToken} type='text' pattern='[0-9]{6}' required className='verify_email' id='verify_token' />

                            <button className={(!this.state.tokenIsSent && !this.state.canResendToken) || this.state.isSendingToken ? 'disabled' : ''} disabled={(!this.state.tokenIsSent && !this.state.canResendToken) || this.state.isSendingToken} type='submit'>
                              {this.state.isVerifyingToken ? 'Verifying...' : 'Verify'}
                            </button>
                          </>
                      }

                    </form>
                  </div>

                  <div className='note'>
                    <span>Note:</span> <br />
                    <span>
                      Files transfered are going to be available for download for the next 7 days.
                    </span>
                  </div>

                </div>

              </div>

              <div className='status_bar'>
                {
                  this.state.errmsg.length > 0 &&
                  <div className='error_msg'>
                    <small>{this.state.errmsg}</small>
                  </div>
                }

                <div className='status_footer'>
                  <button onClick={this.handlePrevious}>
                    <ArrowLeft size='20' />
                  </button>

                  <button disabled={!this.canSend()} className={`send_btn ${!this.canSend() ? 'disabled' : ''}`} onClick={this.handleSend}>
                    Send
                  </button>
                </div>

              </div>
            </div>
          }

          {
            this.state.page === this.pages[3] &&
            <div className='uploading'>

              <div style={{ width: 120, height: 120 }}>
                <CircularProgressbarWithChildren value={this.state.uploadProgress} strokeWidth={5} styles={buildStyles({

                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: 'round',

                  // How long animation takes to go from one percentage to another, in seconds
                  pathTransitionDuration: 0.5,

                  // Colors
                  trailColor: '#eeeeee',
                  pathColor: '#2baf2b',
                })}>
                  <span className='progress'>
                    {this.state.uploadProgress}<small>%</small>
                  </span>
                </CircularProgressbarWithChildren>
              </div>

              <div>
                {this.state.sent ?
                  <span className='sent'><Check size='20' /></span> :
                  <span className='loading'><Loader size='20' /></span>
                }
                &nbsp;
                {this.state.isUploading && 'uploading...'}
                {this.state.isSending && 'sending...'}
                {this.state.sent && 'sent!'}
              </div>

              {this.state.sent &&
                <div className='sent_notice'>
                  <button onClick={this.handleSendAgain} className='send_again'>
                    Send another file
                  </button>
                </div>
              }

            </div>
          }

        </section>  
      </Layout >
    );
  }
}

export default Upload;