import React from "react";
import { useEffect } from "react";

const MessageContainer = ({ msgContainer }) => {
    return (
        <>
            {msgContainer.length === 0 ? (
                <div className="warning">NO HAY MENSAJES</div>
            ) : (
                msgContainer.map((d) => (
                    <div key={d._id}>
                        <strong className="author">{d.author.id}</strong>
                        <span className="day">
                            [{d.day}-{d.hour}]
                        </span>
                        :<em className="text">{d.text}</em>
                    </div>
                ))
            )}
        </>
    );
};

export default MessageContainer;
