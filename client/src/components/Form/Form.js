import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";
//import buildMin from "react-file-base64";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    address: "",
    description: "",
    beds: "",
    baths: "",
    area: "",
    year_built: "",
    property_type: "",
    selectedFile_coverPhoto: "",
    selectedFile_photos: [],
    annual_gross_rents: "",
    rate_of_return: "",
    initial_property_price: "",
    initial_property_share: "",
    expenses: "",
    other_expenses: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      address: "",
      description: "",
      beds: "",
      baths: "",
      area: "",
      year_built: "",
      property_type: "",
      selectedFile_coverPhoto: "",
      selectedFile_photos: [],
      annual_gross_rents: "",
      rate_of_return: "",
      initial_property_price: "",
      initial_property_share: "",
      expenses: "",
      other_expenses: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post.title}"` : "Creating a Post"}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="address"
          variant="outlined"
          label="Address"
          fullWidth
          value={postData.address}
          onChange={(e) =>
            setPostData({ ...postData, address: e.target.value })
          }
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          multiline
          minRows={4}
          value={postData.description}
          onChange={(e) =>
            setPostData({ ...postData, description: e.target.value })
          }
        />
        <TextField
          name="beds"
          variant="outlined"
          label="Number of beds"
          fullWidth
          value={postData.beds}
          onChange={(e) => setPostData({ ...postData, beds: e.target.value })}
        />
        <TextField
          name="baths"
          variant="outlined"
          label="Number of baths"
          fullWidth
          value={postData.baths}
          onChange={(e) => setPostData({ ...postData, baths: e.target.value })}
        />
        <TextField
          name="area"
          variant="outlined"
          label="Property Area (sqft)"
          fullWidth
          value={postData.area}
          onChange={(e) => setPostData({ ...postData, area: e.target.value })}
        />
        <TextField
          name="year_built"
          variant="outlined"
          label="Year Built"
          fullWidth
          value={postData.year_built}
          onChange={(e) =>
            setPostData({ ...postData, year_built: e.target.value })
          }
        />
        <TextField
          name="property_type"
          variant="outlined"
          label="Type of Property"
          fullWidth
          value={postData.property_type}
          onChange={(e) =>
            setPostData({ ...postData, property_type: e.target.value })
          }
        />
        <Typography variant="h6">Financial Information</Typography>
        <TextField
          name="annual_gross_rents"
          variant="outlined"
          label="Annual Gross Rents"
          fullWidth
          value={postData.annual_gross_rents}
          onChange={(e) =>
            setPostData({ ...postData, annual_gross_rents: e.target.value })
          }
        />
        <TextField
          name="rate_of_return"
          variant="outlined"
          label="Rate of Return"
          fullWidth
          value={postData.rate_of_return}
          onChange={(e) =>
            setPostData({ ...postData, rate_of_return: e.target.value })
          }
        />
        <TextField
          name="initial_property_price"
          variant="outlined"
          label="Initial Price of Property"
          fullWidth
          value={postData.initial_property_price}
          onChange={(e) =>
            setPostData({ ...postData, initial_property_price: e.target.value })
          }
        />
        <TextField
          name="initial_property_share"
          variant="outlined"
          label="Set Number of Shares"
          fullWidth
          value={postData.initial_property_share}
          onChange={(e) =>
            setPostData({ ...postData, initial_property_share: e.target.value })
          }
        />
        <TextField
          name="expenses"
          variant="outlined"
          label="Current Expenses"
          fullWidth
          value={postData.expenses}
          onChange={(e) =>
            setPostData({ ...postData, expenses: e.target.value })
          }
        />
        <TextField
          name="other_expenses"
          variant="outlined"
          label="Other Expenses"
          fullWidth
          value={postData.other_expenses}
          onChange={(e) =>
            setPostData({ ...postData, other_expenses: e.target.value })
          }
        />
        <Typography variant="h6">Photos</Typography>
        <div className={classes.fileInput}>
          Cover Photo
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile_coverPhoto: base64 })
            }
          />
        </div>
        <div className={classes.fileInput}>
          Addition Photos
          <FileBase
            type="file"
            multiple={true}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile_photos: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
