import React, { useEffect } from "react";
import InputField from "../common/InputField";
import TextAreaField from "../common/TextAreaField";
import Button from "../common/Button.tsx";
import Tag, { PREDEFINED_TAGS, TagType } from "../common/Tag.tsx";
import { useUserProfile } from "@/context/UserProfileContext.tsx";

interface CreatePostProps {
	onClose: () => void;
	activeTab: "offer" | "request";
}

const CreatePost: React.FC<CreatePostProps> = ({ onClose, activeTab }) => {

	const { user_id } = useUserProfile().profile.id; // Access user profile at the top level
	const [rideType, setRideType] = React.useState<"offer" | "request">("offer");
	const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
	const [destination, setDestination] = React.useState<string>("");
	const [description, setDescription] = React.useState<string>("");

	// Callback when a tag is clicked
	const toggleTag = (tagName: string) => {
		setSelectedTags(prev => 
		prev.includes(tagName) 
			? prev.filter(name => name !== tagName) 
			: [...prev, tagName]
		);
	};

	// Callback for when the CreatePost form is submitted
	const handleNewPost = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = {
			"rideType": rideType,
			"user_id": user_id, // Assume you access to the user ID from context
			"tags": selectedTags,
			"destination": destination,
			"description": description,
		};

		console.log("New Post Data:", formData);
		// Talk to posts_service, send post to Supabase
		try {
			const response = await fetch(`http://posts_service:3000/add_post`, { // Use the API URL
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData), // Convert data to JSON string
			});
	
			if (!response.ok) {
				// Handle HTTP errors (e.g., 400, 500)
				const errorData = await response.json().catch(() => ({})); // Try to parse error details
				console.error('API Error Response:', errorData);
				throw new Error(`Failed to add post: ${response.statusText} ${errorData.details || ''}`);
			}
	
			const result = await response.json(); // Parse the successful JSON response
			console.log("Post Added Successfully:", result);
	
			onClose(); // Close the modal on success
		
			} catch (err: any) {
				console.error("Error submitting post:", err);
			}
	};

	// Styling classes for the offer and request tabs
	const tabBaseClass = "border border-[#555] p-1 rounded-md transition-colors duration-200 cursor-pointer";
	const tabUnselectedClass = "bg-[#333] hover:bg-[#444]";
	const tabSelectedClass = "bg-[#666]";

	// Update rideType based on activeTab
	useEffect(() => {
		setRideType(activeTab);
	}, [activeTab]);

  	return (
		// Fixed black translucent background
		<div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
			{/* CreatePost container, center of screen */}
			<div className="relative flex flex-col bg-[#242424] p-8 rounded-xl w-full max-w-lg justify-center items-center">
        
				{/* Close modal button */}
				<button className="absolute top-7 right-7 px-3 py-1 bg-[#500] hover:bg-[#700] border-0 rounded-lg text-white text-2xl cursor-pointer" onClick={onClose}>
					X
				</button>

				<h2 className="text-2xl font-semibold mt-0 mb-6 self-center">
					Create Post
				</h2>

				<form className="flex flex-col gap-4 w-full justify-center" onSubmit={handleNewPost}>

                    {/* Ride Type Selection */}
					<div className="grid grid-cols-2 gap-4">
						<div
							className={`${tabBaseClass} ${rideType === 'offer' ? tabSelectedClass : tabUnselectedClass}`}
							onClick={() => setRideType('offer')}
						>
							Offering a Ride
						</div>
						<div
							className={`${tabBaseClass} ${rideType === 'request' ? tabSelectedClass : tabUnselectedClass}`}
							onClick={() => setRideType('request')}
						>
							Requesting a Ride
						</div>
					</div>

                    {/* Add Tags section */}
					<div className="flex flex-col gap-4">

						<label>Transportation Type:</label>

						<div className="flex gap-4 p-4 justify-center bg-[#2b2b2b] rounded-xl">
							{Object.entries(PREDEFINED_TAGS).map(
								([tagKey, tag]: [string, TagType]) => (

									<div
										key={tagKey}
										onClick={() => toggleTag(tagKey)}
										className={`cursor-pointer transition-opacity duration-50 ${selectedTags.includes(tagKey) ? 'opacity-100' : 'opacity-50 hover:opacity-75'}`}
									>
										<Tag tag={tag} />
									</div>

								)
							)}
						</div>

					</div>

		            <InputField 
                        label="Destination:" 
                        type="text" 
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)} 
                        required 
                    />

					<TextAreaField 
                        label="Description:" 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
					
					<div className="mt-4">
						<Button text="Post" type="submit"/>
					</div>

				</form>

			</div>
		</div>
  );
};

export default CreatePost;
