<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Calendar_model extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
    }

    public function get_calendar_data($year, $month)
    {

        if ($this->Settings->restrict_calendar) {
            $query = $this->db->select('date, data')->from('calendar')->like('date', "$year-$month", 'after')->where('user_id', $this->session->userdata('user_id'))->get();
        } else {
            $query = $this->db->select('date, data')->from('calendar')->like('date', "$year-$month", 'after')->get();
        }
        $cal_data = array();

        foreach ($query->result() as $row) {
            $day = (int)substr($row->date, 8, 2);
            //$cal_data[$day] = str_replace("|", "<br>", html_entity_decode($row->data));
            $cal_data[$day] = $this->sma->decode_html($row->data);
        }
        return $cal_data;

    }

    public function add_calendar_data($date, $data)
    {

        $data = $this->sma->clear_tags($data, '<p><br><br /><br/>');
        if (empty($data)) {
            $this->deleteEvent($date);
        } else {
            if ($this->db->select('date')->from('calendar')
                ->where('date', $date)->count_all_results()
            ) {

                $this->db->where('date', $date)
                    ->update('calendar', array(
                        'date' => $date,
                        'data' => $data,
                        'user_id' => $this->session->userdata('user_id')
                    ));

            } else {

                $this->db->insert('calendar', array(
                    'date' => $date,
                    'data' => $data,
                    'user_id' => $this->session->userdata('user_id')
                ));
            }
        }

    }

    public function deleteEvent($date)
    {

        if ($this->db->delete('calendar', array('date' => $date))) {
            return true;
        }
        return FALSE;
    }


}

/* End of file calendar_model.php */
/* Location: ./application/models/calendar_model.php */