import React, { Component } from "react";
import { ArrowDown, Download as FileDownload, File, FileText, Image, Lock, Music, Video } from "react-feather";
import Layout from "../components/layout";
import '../scss/download.scss';

class Download extends Component {
  state = {
    requiresPassword: true,
    isUnlocked: false,
    isSubmitting: false,
    downloadableFiles: [
      { name: 'a.pdf', size: 12345678 },
      { name: 'b.pdf', size: 12345678 },
      { name: 'c.pdf', size: 12345678 },
      { name: 'd.pdf', size: 12345678 },
      { name: 'b.pdf', size: 12345678 },
      { name: 'c.pdf', size: 12345678 },
      { name: 'd.pdf', size: 12345678 },
      { name: 'b.pdf', size: 12345678 },
      { name: 'c.pdf', size: 12345678 },
      { name: 'd.pdf', size: 12345678 },
    ],
    downloadableFileSize: 0
  }

  async componentDidMount() {
    // update file size
    let size = 0;
    await this.state.downloadableFiles.forEach((file) => {
      file.icon = this.getIconType(file.type)
      size += this.convertToMb(file.size);
      console.log(size);
    });
    this.setState({ downloadableFileSize: size });

  }

  handleSubmitPassword = (e) => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    setTimeout(() => {
      this.setState({ isSubmitting: false, isUnlocked: true });
    }, 3000);
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

  handleDownload = (e) => {

  }

  handleDownloadAll = (e) => {

  }

  render() {
    return (
      <Layout>
        <section className='download_page'>
          <div>
            {
              this.state.requiresPassword && !this.state.isUnlocked ?
                <div className='unlock'>
                  <form action={null} onSubmit={this.handleSubmitPassword}>
                    <label htmlFor="unlock_file">
                      <span><Lock size='14' />Enter file password</span>
                    </label>
                    <input readOnly={this.state.isSubmitting} type='password' required className='file_password' />

                    <button disabled={this.state.isSubmitting} type='submit'>
                      {this.state.isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </form>
                </div>
                :
                <div className='download'>
                  <div className='download_files_details'>

                    <ul className='download_files'>
                      {
                        this.state.downloadableFiles.map((file, index) => (
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
                              <button className='download_file' onClick={() => this.handleDownload(index)}><ArrowDown size='15' /></button>
                            </li>
                            {
                              this.state.downloadableFiles.length - 1 !== index &&
                              <hr />
                            }
                          </div>
                        ))
                      }
                    </ul>

                  </div>

                  <div className='status_bar'>

                    {/* <div className='error_msg'>
                      {
                        this.state.uploadFileSize > this.state.totalFileSizeAllowed &&
                        <small>You can only upload 1GB of filesize at a time!</small>
                      }
                    </div> */}

                    <div className='status_footer'>
                      <span className='no_files'>
                        {this.state.downloadableFiles.length} file{this.state.downloadableFiles.length > 1 && 's'} ∙ {this.state.downloadableFileSize.toFixed(1)}MB
                      </span>

                      <button onClick={this.handleDownloadAll} title='Download All'>
                        <FileDownload size='20' />
                      </button>
                    </div>

                  </div>

                  {/* <button className='download_file'>
                    <FileDownload size='40' />
                  </button>
                  <span>Download your files</span> */}
                </div>
            }
          </div>
        </section>
      </Layout>
    );
  }
}

export default Download;