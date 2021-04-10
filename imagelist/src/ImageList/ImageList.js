import React from 'react';
import axios from 'axios';
class ImageList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        imagesList: [],
        compareList: []
      }
    }
  
    componentDidMount() {
        this.getImages();
    }

    getImages = async () =>{
        const response2 = await axios.get('https://jsonplaceholder.typicode.com/photos');
        console.log("fetch data in did mount", response2.data.splice(4900));
        this.setState({
            imagesList: response2.data.splice(4000)
        })
    }

    compareImage = (image) =>{
        const {imagesList}=this.state;
        const newArray = imagesList.map((item) =>{
            if(item.id === image.id){
                return {...item, isCompare: true}
            }else{
                return item;
            }
        })
        console.log("new list", newArray)
        this.setState({
            compareList: [...this.state.compareList, image],
            imagesList: newArray
        })
    }

    removeItem = (image) =>{
        const {imagesList, compareList} =this.state;
        let filteredCompareArray = compareList.filter(item => item.id !== image.id);
        let newImageList = imagesList.map((item) =>{
            if(item.id === image.id && item.isCompare){
                delete item.isCompare;
                return item;
            }else{
                return item;
            }
        })
        this.setState({
            compareList: filteredCompareArray,
            imagesList: newImageList
        });

    }

    render() {
        const {imagesList, compareList } =this.state;
      return (
        <div className="App">
        <h1>Image/Photo Comparison SPA</h1>
        <h2>Fetch a list from an API and display it</h2>
  
        {/* Display data from API */}
        <div className="parent-wraper">
            <div className="images">
            { imagesList && imagesList.map((image, index) => {
                return (
                    <div className="image" key={index}>
                    <div className="details">
                        <img src={image.url} style={{maxWidth: "30%"}} />
                        <p><b>Title:</b> {image.title} </p>
                        <p><b>URL:</b> {image.thumbnailUrl}</p>
                    </div>
                    <h3><b>Album-Id:</b> {image.albumId}</h3>
                    <h2><b>ID:</b>  {image.id}</h2>
                    {
                        image.isCompare ? 
                            <button className="fetch-button" onClick={() => this.removeItem(image)}>
                                Remove
                            </button>   :
                            <button className="fetch-button" onClick={() => this.compareImage(image)}>
                                Compare
                            </button>
                    }
                    </div>
                );
                })
            }
            </div>
        </div>

        <div className="wrapper mt-4">
            <p className="details mb-3">COMPARISON TABLE</p>
        <div className="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>URL</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                { compareList && compareList.map((image, index) => {
                        return (
                            <tr key={index}>
                                <td><img src={image.url} style={{maxWidth: "10%"}} /></td>
                                <td>{image.id}</td>
                                <td>{image.thumbnailUrl}</td>
                                <td>{image.title}</td>
                            </tr>
                        );
                    })
                }
                { compareList.length <=0 ? <span className="details">No Images to compare</span> : null }
                </tbody>
            </table>
        </div>
        </div>

      </div>
      );
    }
  }
  
  export default ImageList;