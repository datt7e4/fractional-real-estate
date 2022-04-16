import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deletePost } from "../../../actions/posts";
import useStyles from "./styles";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultImage =
    "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png";
  const price_per_share =
    post.initial_property_price / post.initial_property_share;

  const price_format = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const openPost = () => {
    // dispatch(getPost(post._id, history));

    navigate(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile_coverPhoto || defaultImage}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button
            onClick={() => setCurrentId(post._id)}
            style={{ color: "white" }}
            size="small"
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
      )}
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardContent>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {post.title}
          </Typography>
          <div className={classes.cardDetails}>
            <Typography variant="body2" component="p">
              Total Price <br />${price_format(post.initial_property_price)}
            </Typography>
            <Typography variant="body2" component="p">
              Price Per Share <br />${price_format(price_per_share)}
            </Typography>
          </div>
          <div className={classes.cardDetails}>
            <Typography variant="body2" color="textSecondary" component="p">
              Estimate ROI:
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {price_format(post.rate_of_return)}%
            </Typography>
          </div>
          <div className={classes.cardDetails}>
            <Typography variant="body2" color="textSecondary" component="p">
              Gross Rent:
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              $ {price_format(post.annual_gross_rents)} / year
            </Typography>
          </div>

          <Typography variant="body2" color="textSecondary" component="p">
            {post.address}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
