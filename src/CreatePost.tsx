import React from 'react';
import InputField from './common/InputField.tsx';
import TextAreaField from './common/TextAreaField.tsx';

interface CreatePostProps {
	onClose: () => void;
}

const overlayStyle: React.CSSProperties = {
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	backgroundColor: 'rgba(0,0,0,0.5)',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

const contentStyle: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
	backgroundColor: '#242424',
	padding: '2em',
	borderRadius: '20px',
	maxWidth: '500px',
	width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};

const formStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '1em',
  justifyContent: 'center',
  width: '100%',
};

const closeButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '1.25em',
  right: '1.25em',
  padding: '0.25em 0.5em',
  backgroundColor:'#550000',
  border: 'none',
  color: '#fff',
  fontSize: '1.5em',
  cursor: 'pointer',
};

const CreatePost: React.FC<CreatePostProps> = ({ onClose }) => {

	return (
		<div style={overlayStyle}>
			<div style={contentStyle}>
        
				<button style={closeButtonStyle} onClick={onClose}>X</button>
				<h2 style={{ marginTop: '0' }}>Create Post</h2>
				<form style={formStyle}>
          
          <InputField label="Title:" type="text" required/>
					<TextAreaField label="Content:" required/>

					<button style={{marginTop: '1em'}} type="submit">Post</button>
				</form>
			</div>
		</div>
	);

};

export default CreatePost;
