import React from 'react';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import EmojiIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import { useHomeStyles } from '../pages/theme';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAddTweet,
  setAddFormState,
} from '../store/ducks/tweets/actionCreators';
import { selectAddFormState } from '../store/ducks/tweets/selectors';
import { AddFormState } from '../store/ducks/tweets/contracts/state';
import { UploadImages } from './UploadImages';
import { uploadImage } from '../utils/uploadImage';

interface AddTweetFormProps {
  classes: ReturnType<typeof useHomeStyles>;
  maxRows?: number;
}

const MAX_LENGTH = 280;

export interface ImageObj {
  blobUrl: string;
  file: File;
}

export const AddTweetForm: React.FC<AddTweetFormProps> = ({
  classes,
  maxRows,
}: AddTweetFormProps): React.ReactElement => {
  const dispatch = useDispatch();
  const [text, setText] = React.useState<string>('');
  const [images, setImages] = React.useState<ImageObj[]>([]);

  const addFormState = useSelector(selectAddFormState);
  const textLimitPercent = Math.round((text.length / 280) * 100);
  const textCount = MAX_LENGTH - text.length;

  const handleChangeTextArea = (
    e: React.FormEvent<HTMLTextAreaElement>
  ): void => {
    if (e.currentTarget) {
      setText(e.currentTarget.value);
    }
  };

  const handleClickAddTweet = async (): Promise<void> => {
    let result = [];
    dispatch(setAddFormState(AddFormState.LOADING));
    for (let i = 0; i < images.length; i++) {
      const file = images[i].file;
      const { url } = await uploadImage(file);
      result.push(url);
    }
    dispatch(fetchAddTweet({ text, images: result }));
    setText('');
    setImages([]);
  };

  return (
    <div>
      <div className={classes.addFormBody}>
        <Avatar
          className={classes.tweetAvatar}
          alt={`Аватар Пользователя UserAvatar`}
        />
        <TextareaAutosize
          onChange={handleChangeTextArea}
          className={classes.addFormTextarea}
          placeholder="Что происходит?"
          value={text}
          rowsMax={maxRows}
        />
      </div>
      <div className={classes.addFormBottom}>
        <div className={classes.tweetFooter}>
          <div
            className={classNames(
              classes.tweetFooter,
              classes.addFormBottomActions
            )}
          />
          <UploadImages images={images} onChangeImages={setImages} />
          {/* <IconButton color="primary">
            <EmojiIcon style={{ fontSize: 26 }} />
          </IconButton> */}
        </div>
        <div className={classes.addFormBottomRight}>
          {text && (
            <>
              <span>{textCount}</span>
              <div className={classes.addFormCircleProgress}>
                <CircularProgress
                  variant="static"
                  size={20}
                  thickness={4}
                  value={text.length >= MAX_LENGTH ? 100 : textLimitPercent}
                  style={
                    text.length >= MAX_LENGTH ? { color: 'red' } : undefined
                  }
                />
                <CircularProgress
                  style={{ color: 'rgba(0, 0, 0, 0.1)' }}
                  variant="static"
                  size={20}
                  thickness={5}
                  value={100}
                />
              </div>
            </>
          )}
          <Button
            disabled={
              addFormState === AddFormState.LOADING ||
              !text ||
              text.length >= MAX_LENGTH
            }
            color="primary"
            variant="contained"
            onClick={handleClickAddTweet}
          >
            {addFormState === AddFormState.LOADING ? (
              <CircularProgress color="inherit" size={16} />
            ) : (
              'Твитнуть'
            )}
          </Button>
        </div>
      </div>
      {addFormState === AddFormState.ERROR && (
        <Alert severity="error">Ошибка при добавлении твита!</Alert>
      )}
    </div>
  );
};
