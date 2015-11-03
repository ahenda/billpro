<?php

class Sma_hooks {
    protected $CI;
    public function __construct() {
        $this->CI =& get_instance();
    }
    public function check() {
        if(! ($this->CI->db->conn_id)) {
            header("Location: install/index.php");
            die();
        }
    }

    public function minify() {
        ini_set("pcre.recursion_limit", "16777");
        $buffer = $this->CI->output->get_output();

        $re =   '%# Collapse whitespace everywhere but in blacklisted elements.
                (?>             # Match all whitespans other than single space.
                  [^\S ]\s*     # Either one [\t\r\n\f\v] and zero or more ws,
                  | \s{2,}        # or two or more consecutive-any-whitespace.
                  ) # Note: The remaining regex consumes no text at all...
                (?=             # Ensure we are not in a blacklist tag.
                  [^<]*+        # Either zero or more non-"<" {normal*}
                  (?:           # Begin {(special normal*)*} construct
                    <           # or a < starting a non-blacklist tag.
                    (?!/?(?:textarea|pre|script)\b)
                    [^<]*+      # more non-"<" {normal*}
                    )*+           # Finish "unrolling-the-loop"
                (?:           # Begin alternation group.
                    <           # Either a blacklist start tag.
                    (?>textarea|pre|script)\b
                    | \z          # or end of file.
                    )             # End alternation group.
                )  # If we made it here, we are not in a blacklist tag.
                %Six';

        $new_buffer = preg_replace($re, " ", $buffer);

        if($new_buffer === null) {
            $new_buffer = $buffer;
        }

        $this->CI->output->set_output($new_buffer);
        $this->CI->output->_display();
    }

}
