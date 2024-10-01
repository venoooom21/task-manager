/*import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';

import Toolbar, { Item } from 'devextreme-react/toolbar';
import LoadPanel from 'devextreme-react/load-panel';

import { TaskListGrid, TaskListKanban, TaskListGantt, FormPopup, TaskFormDetails } from '../../components';

import { newTask as newTaskDefaults } from '../../shared/constants';
import { useScreenSize } from '../../utils/media-query';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import './planning-task-list.scss';
import Button from 'devextreme-react/button';
import TextBox from 'devextreme-react/text-box';
import Tabs from 'devextreme-react/tabs';
import notify from 'devextreme/ui/notify';

const listsData = ['List', 'Kanban Board', 'Gantt'];

export const PlanningTaskList = () => {
  const gridRef = useRef(null);
  const kanbanRef = useRef(null);
  const ganttRef = useRef(null);

  const [listView, kanbanView, ganttView] = listsData;
  const [view, setView] = useState(listView);
  const [index, setIndex] = useState(0);
  const [gridData, setGridData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formTaskInitData, setFormTaskInitData] = useState({ ...newTaskDefaults });
  const [popupVisible, setPopupVisible] = useState(false);

  const { isXSmall } = useScreenSize();

  const isDataGrid = view === listView;
  const isKanban = view === kanbanView;

  let newTaskData = { ...newTaskDefaults };

  const changePopupVisibility = useCallback((isVisible) => {
    setPopupVisible(isVisible);
  }, []);

  useEffect(() => {
    // Simulating data load from an external source
    const dummyTasks = [
      { id: 1, text: 'Task 1', status: 'in progress' },
      { id: 2, text: 'Task 2', status: 'to do' },
      { id: 3, text: 'Task 3', status: 'completed' },
    ];
    setGridData(dummyTasks);
    setFilteredData(dummyTasks);
    setLoading(false);
  }, []);

  const onSaveClick = () => {
    notify({
      message: `New task "${newTaskData.text}" saved`,
      position: { at: 'bottom center', my: 'bottom center' }
    }, 'success');
    setFormTaskInitData({ ...newTaskDefaults });
  };

  const onDataChanged = useCallback((data) => {
    newTaskData = data;
  }, []);

  const onTabClick = useCallback((e) => {
    setView(e.itemData || '');
    setIndex(listsData.findIndex((d) => d === e.itemData));
  }, []);

  const onAddTaskClick = useCallback(() => {
    setFormTaskInitData({ ...newTaskDefaults });
    setPopupVisible(true);
  }, []);

  const refresh = useCallback(() => {
    // Simulate refreshing the view based on the selected tab
    if (isDataGrid) {
      gridRef.current?.instance().refresh();
    } else if (isKanban) {
      kanbanRef.current?.instance().update();
    } else {
      ganttRef.current?.instance().refresh();
    }
  }, [view]);

  const showColumnChooser = useCallback(() => {
    gridRef.current?.instance().showColumnChooser();
  }, []);

  const exportToPDF = useCallback(() => {
    if (isDataGrid) {
      const doc = new jsPDF();
      doc.text('Tasks List', 10, 10);
      doc.autoTable({ head: [['Task ID', 'Task Name', 'Status']], body: gridData.map(task => [task.id, task.text, task.status]) });
      doc.save('Tasks.pdf');
    }
  }, [gridData]);

  const exportToXSLX = useCallback(() => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Main sheet');
    worksheet.columns = [
      { header: 'Task ID', key: 'id', width: 10 },
      { header: 'Task Name', key: 'text', width: 30 },
      { header: 'Status', key: 'status', width: 15 },
    ];
    gridData.forEach(task => {
      worksheet.addRow(task);
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
    });
  }, [gridData]);

  const search = useCallback((e) => {
    const query = e.component.option('text') || '';
    const filtered = gridData.filter(task => task.text.toLowerCase().includes(query.toLowerCase()));
    setFilteredData(filtered);
  }, [gridData]);

  const getTabsWidth = useCallback(() => {
    return isXSmall ? 220 : 'auto';
  }, []);

  return (
    <div className='view-wrapper view-wrapper-task-list list-page'>
      <Toolbar className='toolbar-common theme-dependent'>
        <Item location='before'>
          <span className='toolbar-header'>Tasks</span>
        </Item>
        <Item location='before' widget='dxTabs'>
          <Tabs dataSource={listsData} width={getTabsWidth()} selectedIndex={index} scrollByContent showNavButtons={false} onItemClick={onTabClick} />
        </Item>
        <Item location='after' widget='dxButton'>
          <Button icon='plus' text='Add Task' type='default' stylingMode='contained' onClick={onAddTaskClick} />
        </Item>
        <Item location='after' widget='dxButton'>
          <Button icon='refresh' text='Refresh' stylingMode='text' onClick={refresh} />
        </Item>
        <Item location='after' widget='dxButton' disabled={view !== listView}>
          <Button icon='columnchooser' text='Column Chooser' stylingMode='text' onClick={showColumnChooser} />
        </Item>
        <Item location='after' widget='dxButton' disabled={isKanban}>
          <Button icon='exportpdf' text='Export To PDF' stylingMode='text' onClick={exportToPDF} />
        </Item>
        <Item location='after' widget='dxButton' disabled={view !== listView}>
          <Button icon='exportxlsx' text='Export To XSLX' stylingMode='text' onClick={exportToXSLX} />
        </Item>
        <Item location='after' widget='dxTextBox'>
          <TextBox mode='search' placeholder='Task Search' onInput={search} />
        </Item>
      </Toolbar>

      {loading && <LoadPanel container='.content' showPane={false} visible position={{ of: '.content' }} />}

      {!loading && isDataGrid && <TaskListGrid dataSource={gridData} ref={gridRef} />}
      {!loading && isKanban && <TaskListKanban dataSource={filteredData} ref={kanbanRef} />}
      {!loading && view === ganttView && <TaskListGantt dataSource={filteredData} ref={ganttRef} />}

      <FormPopup title='New Task' visible={popupVisible} setVisible={changePopupVisibility} onSave={onSaveClick}>
        <TaskFormDetails subjectField data={formTaskInitData} editing onDataChanged={onDataChanged} />
      </FormPopup>
    </div>
  );
};
*/