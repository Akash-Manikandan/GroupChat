import { useEffect, useRef } from "react";
import Bubble from "../Bubble/Bubble";

const Message = ({ id, messages }: { id: string; messages: any[] }) => {
  const bottomRef = useRef(null);
  useEffect(() => {
    //@ts-ignore
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div>
      {messages.length !== 0
        ? messages.map((message: any, i: any) => {
            return (
              <div key={message.id}>
                <Bubble message={message} id={id} />
                {messages.length === i + 1 && (
                  <div ref={bottomRef}></div>
                )}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Message;
