import React from "react";
import Tag, { TagType } from "../common/Tag.tsx";

interface ListedPostProps {
  post: {
    id: string;
    user: {
      name: string;
      university: string;
      avatar?: string;
    };
    tags: TagType[];
    type: "offer" | "request";
    destination: string;
    requestCount: number;
    timestamp: Date;
    content: string;
  };
}

const UserAvatar: React.CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "#aaa",
  marginTop: "0.4em",
  marginRight: "1em",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#1d1d1d",
  fontWeight: "bold",
};

const ListedPost: React.FC<ListedPostProps> = ({ post }) => {
  
  const formattedDate = post.timestamp.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
  });

  const formattedTime = post.timestamp
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();

  const initials = post.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex p-6 bg-[#1d1d1d] rounded-2xl font-medium">
      <div style={UserAvatar}>
        {post.user.avatar ? (
          <img
            src={post.user.avatar}
            alt={post.user.name}
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "1em",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#aaa",
          }}
        >
          <div style={{ display: "flex", gap: "1em", alignItems: 'center' }}>
            <span style={{ textAlign: "start" }}>
              {post.user.university}
              <br />
              {post.destination}
            </span>
            <span style={{ alignItems: 'center', color: 'green', fontSize: "1.1em" }}>
              • {post.requestCount}{" "}{post.requestCount === 1 ? "Request" : "Requests"}

            </span>
            {post.tags.map((tag) => (
                <Tag tag={tag} key={tag.name} />
            ))}
          </div>
          <span style={{ textAlign: "end" }}>
            {formattedTime}
            <br />
            {formattedDate}
          </span>
        </div>

        <p className="text-[#aaa] text-[1em] font-[300] text-start m-0 overflow-hidden line-clamp-3">{post.content}</p>
      </div>
    </div>
  );
};

export default ListedPost;
