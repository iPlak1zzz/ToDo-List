const modalOverlay = document.getElementById('modal-overlay-add-task')
const modal = document.querySelector('.modal')

const modalOverlayDeleteTask = document.getElementById('modal-overlay-delete-task')
const deleteTaskModal = document.getElementById('modal-delete-task')

const searchInput = document.getElementById('search')

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
    }
})

const modalToSwitchTheme = document.getElementById('modal-to-apply-switch-theme')
const modalOverlayToSwitchTheme = document.getElementById('modal-overlay-to-switch-theme')
const closeModalThemeButton = document.getElementById('close-switch-theme-modal-btn')
const switchThemeButtonInModal = document.getElementById('switch-theme-btn-in-modal')
const themeToggleButton = document.getElementById('switch-theme-btn')
const themeLink = document.getElementById('theme-vars')
console.log(themeLink.getAttribute('href'))

themeToggleButton.addEventListener('click', () => {
    openModal(modalToSwitchTheme, modalOverlayToSwitchTheme)
})

closeModalThemeButton.addEventListener('click', () => {
    closeModal(modalToSwitchTheme, modalOverlayToSwitchTheme)
})

switchThemeButtonInModal.addEventListener('click', () => {
    if (themeLink.getAttribute('href').includes('light-theme.css')) {
        themeLink.href = "./themes/dark-theme.css"
        console.log('Dark theme is turn on right now')
    } else {
        themeLink.href = "./themes/light-theme.css"
        console.log('Light theme is turn on right now')
    }

    closeModal(modalToSwitchTheme, modalOverlayToSwitchTheme)
})


const openModalButton = document.querySelector('.add-task-button')
const closeModalButton = document.querySelector('.close-modal-button')
const applyButton = document.getElementById('create-task-btn')
const containerOpenModal = document.getElementById('container-open-modal')

let taskId = 0

openModalButton.addEventListener('click', () => {
    modal.style.display = "flex"
    modalOverlay.style.display = "flex"
    modalOverlay.style.justifyContent = "center"
    modalOverlay.style.alignItems = "center"
})

const openModal = (modal, overlay) => {
    modal.classList.add('display-flex')
    overlay.classList.add('display-flex')

    modal.classList.remove('display-none')
    overlay.classList.remove('display-none')
}

const closeModal = (modal, overlay) => {
    modal.classList.remove('display-flex')
    overlay.classList.remove('display-flex')

    modal.classList.add('display-none')
    overlay.classList.add('display-none')
}

const closeModaLWindow = () => {
    modal.style.display = "none"
    modalOverlay.style.display = "none"
}

const applyButtonCloseModal = () => {
    modal.style.display = "none"
    modalOverlay.style.display = "none"
}



closeModalButton.addEventListener('click', closeModaLWindow)

const emptyMain = document.getElementById('sub-content')

const createTaskForm = document.getElementById('form-to-create-task')

const taskRulesNameCreate = document.querySelectorAll('#modal-to-create-task .modal__task-name-rule')
const inputToTaskName = document.getElementById('input-to-task-name')
let taskName = ''

const positionModalButton = () => {
    if (emptyMain.classList.contains('sub-content-not-aviable')) {
        containerOpenModal.style.marginTop = "50px"
    } else {
        containerOpenModal.style.marginTop = "80px"
        console.log('Работает')
    }
}

window.onload = function () {
    positionModalButton()
}

const checkTaskRulesName = [
    (value) => value.trim().length > 3,
    (value) => !value.startsWith(" "),
    (value) => value.trim().length > 0,
]

/* Я пишу код, и понимаю, что тут как бы ну что-то типо КАШИ получается, поэтому я оставил тут свой комментарий на случай того, что если кому-то будет что-то не понятно конкретно на этом моменте :>

У меня изначально создание названия задачи было всее целиком было в AddEventListener, и из-за того, что мне при реализации логики смены названия задачи нужно было еще раз это использовать, я решил этот код внутри AddEventListener вынести в глобальную область видимости в виде функции, вроде все юляяяя. */

const validateInput = (input, rules, rulesArray) => {
    const inputValue = input.value
    let allRulesValid = true

    rules.forEach((rule, index) => {
        const checkFn = rulesArray[index]

        if (!checkFn) return

        const isValid = checkFn(inputValue)

        if (!isValid) {
            allRulesValid = false
        }

        rule.classList.toggle('rule-valid', isValid)
        rule.classList.toggle('rule-invalid', !isValid)

        if (inputValue === '') {
            rule.classList.remove('rule-valid', 'rule-invalid')
        }
    })

    if (allRulesValid) {
        taskName = inputValue
    } else {
        taskName = ''
    }
}


const clearInput = (taskRule) => {
    inputToTaskName.value = ''

    taskRule.forEach(rule => {
        rule.classList.remove('rule-valid', 'rule-invalid')
    })
}

const clearTaskName = (taskNameValue) => {
    taskNameValue.value = ''
    taskName = ''
}

inputToTaskName.addEventListener('input', () => {
    validateInput(inputToTaskName, taskRulesNameCreate, checkTaskRulesName)
})

inputToTaskName.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        validateInput(inputToTaskName, taskRulesNameCreate, checkTaskRulesName)
        if (!taskName) {
            event.preventDefault()
            return
        }
        createTask()
        event.preventDefault()
    }
})

let taskToEdit = null

const tasksContainer = document.getElementById('task-list')


function createTask() {
    if (!taskName) {
        return
    }

    const task = document.createElement('div')
    task.className = 'task'
    task.classList.add('task--incomplete')

    task.innerHTML = `
        <div class="task__form-check">
      <label for="task-check" class="task__form-label"></label>
      <input type="checkbox" id="checkbox-task" class="task__form-input">
    </div>
    <h2 class="task__title">
      ${taskName}
    </h2>
    <div class="task__btns">
      <button class="task__edit-name-btn btn" title="Button to change task name" id="change-task-name-button">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M8.67272 5.99106L2 12.6637V16H5.33636L12.0091 9.32736M8.67272 5.99106L11.0654 3.59837L11.0669 3.59695C11.3962 3.26759 11.5612 3.10261 11.7514 3.04082C11.9189 2.98639 12.0993 2.98639 12.2669 3.04082C12.4569 3.10257 12.6217 3.26735 12.9506 3.59625L14.4018 5.04738C14.7321 5.37769 14.8973 5.54292 14.9592 5.73337C15.0136 5.90088 15.0136 6.08133 14.9592 6.24885C14.8974 6.43916 14.7324 6.60414 14.4025 6.93398L14.4018 6.93468L12.0091 9.32736M8.67272 5.99106L12.0091 9.32736"
                stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="task__delete-task-btn btn" id="delete-task-button" title="Button to delete task" data-task-id="${taskId}">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M3.87414 7.61505C3.80712 6.74386 4.49595 6 5.36971 6H12.63C13.5039 6 14.1927 6.74385 14.1257 7.61505L13.6064 14.365C13.5463 15.1465 12.8946 15.75 12.1108 15.75H5.88894C5.10514 15.75 4.45348 15.1465 4.39336 14.365L3.87414 7.61505Z"
                stroke="white" />
          <path d="M14.625 3.75H3.375" stroke="white" stroke-linecap="round" />
          <path d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z" stroke="white" />
          <path d="M10.5 9V12.75" stroke="#FFFBFB" stroke-linecap="round" />
          <path d="M7.5 9V12.75" stroke="#FFFBFB" stroke-linecap="round" />
        </svg>
      </button>
    </div>
    `

    const taskCheckbox = task.querySelector('#checkbox-task')

    taskCheckbox.addEventListener('change', () => {
        if (taskCheckbox.checked) {
            task.classList.remove('task--incomplete')
            task.classList.add('task--complete')
        } else {
            task.classList.add('task--incomplete')
            task.classList.remove('task--complete')
        }
    })

    taskId += 1

    task.dataset.taskId = taskId

    tasksContainer.appendChild(task)

    emptyMain.classList.add('sub-content-not-aviable')


    taskToEdit = task

    applyButtonCloseModal()
    clearInput(taskRulesNameCreate)
    clearTaskName(inputToTaskName)
    positionModalButton()

    console.log(`Номер задачи: ${taskId}`)
}

applyButton.addEventListener('click', () => {
    createTask()
})

/**! Дропдовн меню */

const dropdownButton = document.getElementById('header-dropdown-btn')
const headerDropdownMenu = document.getElementById('header-dropdown-menu')
const dropdownIcon = document.getElementById('dropdown-icon')

const headerDropdownItemsArray = document.querySelectorAll('.header__dropdown-item')

const openDropdownMenu = (dropDownMenu, dropdownIcon) => {
    dropDownMenu.classList.remove('display-none')
    dropDownMenu.classList.add('shadow')
    dropDownMenu.classList.add('display-flex')
    dropdownIcon.classList.add('chevron-rotate')
}

const closeDropdownMenu = (dropDownMenu, dropdownIcon) => {
    dropDownMenu.classList.add('display-none')
    dropdownIcon.classList.remove('chevron-rotate')
    dropDownMenu.classList.remove('shadow')
    dropDownMenu.classList.remove('display-flex')
}



dropdownButton.addEventListener('click', () => {
    if (headerDropdownMenu.classList.contains('display-none')) {
        openDropdownMenu(headerDropdownMenu, dropdownIcon)
    } else {
        closeDropdownMenu(headerDropdownMenu, dropdownIcon)
    }
})

window.addEventListener('load', () => {
    window.addEventListener('mouseup', (event) => {
        if (!event.target.closest('#header-dropdown-btn')) {
            closeDropdownMenu(headerDropdownMenu, dropdownIcon)
        }
    })
})

/** Логика фильтрации задач */

const dropdownItems = document.querySelectorAll('.header__dropdown-item')

const filterTask = (selectedValue) => {
    const allTasks = tasksContainer.querySelectorAll('.task')
    const value = selectedValue.toLowerCase()

    allTasks.forEach(task => {
        task.classList.remove('display-none')

        if (value === 'complete' && !task.classList.contains('task--complete')) {
            task.classList.add('display-none')
        } else if (value === 'incomplete' && !task.classList.contains('task--incomplete')) {
            task.classList.add('display-none')
        }
    })
}

dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        const selectedValue = item.dataset.value
        dropdownButton.innerText = item.dataset.value
        filterTask(selectedValue)
    })
})

// const filterTask = (container) => {
//     const filterValue = dropdownButton.innerText.toLocaleLowerCase()
//     console.log(filterValue)
//     const allTasks = container.querySelectorAll('.task')
//     console.log(allTasks)
//     allTasks.forEach((task) => {
//         if (filterValue === 'complete') {
//             if (task.classList.contains('task--incomplete')) {
//                 task.classList.add('display-none')
//             }
//         } else if (filterValue === 'incomplete') {
//             if (task.classList.contains('task--complete')) {
//                 task.classList.add('display-none')
//             }
//         } else {
//             task.classList.remove('display-none')
//         }
//     })
// }

// const checkDropdownValue = (dropdownButton, dropdownValues) => {
//     dropdownValues.forEach((value) => {
//         value.addEventListener('click', () => {
//             dropdownButton.innerText = value.dataset.value
//             filterTask(tasksContainer)
//         })
//     })
//     console.log('task')
// }

/** Логика фильтрации задач */

const modalOverlayEditTaskName = document.getElementById('modal-overlay-edit-task-name')
const modalEditTaskName = document.getElementById('modal-edit-task-name')
const closeEditTaskNameModal = document.getElementById('close-modal-edit-task-name-button')
const applyEditTaskNameModal = document.getElementById('edit-task-name-btn')

const overlayModalEdittingTaskName = document.getElementById('modal-overlay-editting-task-name')
const modalEdittingTaskName = document.getElementById('modal-editting-task-name')
const taskRulesNameEdit = document.querySelectorAll('#modal-editting-task-name .modal__task-edit-name-rule')
const inputToEditTaskName = document.getElementById('input-to-edit-task-name')
const checkEditNameRules = [
    (value) => value.trim().length > 3,
    (value) => !value.startsWith(" "),
    (value) => value.trim().length > 0
]
const closeModalEdittingTaskNameButton = document.getElementById('close-modal-editting-task-name-btn')
const applyModalEdittingTaskNameButton = document.getElementById('apply-modal-editting-task-name-btn')

tasksContainer.addEventListener('click', editingName => {
    const editTaskNameBtn = editingName.target.closest('.task__edit-name-btn')

    if (!editTaskNameBtn) return
    taskToEdit = editingName.target.closest('.task')
    openModal(modalEditTaskName, modalOverlayEditTaskName)
})

closeEditTaskNameModal.addEventListener('click', () => {
    closeModal(modalEditTaskName, modalOverlayEditTaskName)
})

inputToEditTaskName.addEventListener('input', () => {
    validateInput(inputToEditTaskName, taskRulesNameEdit, checkEditNameRules)
})

inputToEditTaskName.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        validateInput(inputToEditTaskName, taskRulesNameEdit, checkEditNameRules)
        if (!taskName) {
            event.preventDefault()
            return
        }
        editTaskName()
        event.preventDefault()
    }
})

applyEditTaskNameModal.addEventListener('click', () => {
    closeModal(modalEditTaskName, modalOverlayEditTaskName)
    openModal(modalEdittingTaskName, overlayModalEdittingTaskName)
    validateInput(inputToEditTaskName, taskRulesNameEdit, checkEditNameRules)
})

closeModalEdittingTaskNameButton.addEventListener('click', () => {
    closeModal(modalEdittingTaskName, overlayModalEdittingTaskName)
})

function editTaskName() {
    if (!taskName) {
        return
    }

    validateInput(inputToEditTaskName, taskRulesNameEdit, checkEditNameRules)

    const edittingTaskName = taskToEdit.querySelector('.task__title')

    edittingTaskName.textContent = taskName
    console.log(taskName)

    closeModal(modalEdittingTaskName, overlayModalEdittingTaskName)
    clearTaskName(inputToEditTaskName)
    clearInput(taskRulesNameEdit)
}

applyModalEdittingTaskNameButton.addEventListener('click', () => {
    editTaskName()
})

const deleteTaskButtonInModal = document.getElementById("delete-task-btn")
const deleteTaskButtonCloseModal = document.getElementById('close-delete-modal')
const deleteTaskButtonToCloseModal = document.getElementById('close-delete-modal')

tasksContainer.addEventListener('click', deletingTask => {
    if (!deletingTask.target.closest(".task__delete-task-btn")) {
        return
    } else {
        openModal(deleteTaskModal, modalOverlayDeleteTask)


        deleteTaskButtonToCloseModal.addEventListener('click', () => {
            closeModal(deleteTaskModal, modalOverlayDeleteTask)
        })

        deleteTaskButtonInModal.addEventListener('click', () => {
            const deleteButtonInEvent = deletingTask.target.closest(".task__delete-task-btn")

            const taskInEvent = deleteButtonInEvent.closest(".task")

            taskInEvent.remove()
            closeModal(deleteTaskModal, modalOverlayDeleteTask)

            if (tasksContainer.children.length > 0) {
                return
            } else {
                emptyMain.classList.remove('sub-content-not-aviable')
            }
        })
    }
})