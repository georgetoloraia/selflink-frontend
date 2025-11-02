import { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ open, onClose, title, children, footer }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const handler = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const content = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="presentation"
          onClick={onClose}
        >
          <motion.div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            {title && (
              <header className="modal__header">
                <h2 id="modal-title">{title}</h2>
              </header>
            )}
            <div className="modal__body">{children}</div>
            {footer && <footer className="modal__footer">{footer}</footer>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
};

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node
};

Modal.defaultProps = {
  open: false,
  onClose: () => {},
  title: undefined,
  footer: undefined
};

export default Modal;
