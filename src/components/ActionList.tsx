import { useMemo, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ReactSelect from "react-select";
import { Tag } from "../App";
import { actions } from "../data/index";
import LinkCard from "./LinkCard";
import { v4 as uuidV4 } from "uuid";

export function ActionList() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const availableTags = actions.flatMap(
    (action) =>
      action.tags?.map((tag) => ({
        key: action.key,
        id: uuidV4(),
        label: tag,
      })) || []
  );

  const filteredActions = useMemo(() => {
    return actions.filter((action) => {
      const matchesTitle =
        title === "" || action.name.toLowerCase().includes(title.toLowerCase());
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((selectedTag) =>
          action.tags?.some(
            (actionTag) =>
              actionTag.toLowerCase() === selectedTag.label.toLowerCase()
          )
        );
      return matchesTitle && matchesTags;
    });
  }, [title, selectedTags]);
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Clickify</h1>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                className="select-container"
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <section className="grid-container">
        {filteredActions.map((action, index) => (
          <LinkCard key={`linkCard_${index}`} action={action} />
        ))}
      </section>
    </>
  );
}
