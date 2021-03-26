import { useState, useEffect } from 'react'
import {
  Form,
  Input,
  Select,
  Modal,
  Slider,
  InputNumber,
  Col, Row
} from 'antd'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  hideSaveFavorites,
  saveFavorites,
  toggleTooltip,
  saveFavoriteItem
} from '../../store/actions/search'
import './favorite-form.scss'

function FavoriteForm() {
  const { Option } = Select
  const [form] = Form.useForm()
  const orderOptions = [
    {title: 'По названию', value: 'title'},
    {title: 'По рейтингу', value: 'rating'},
    {title: 'По дате добавления', value: 'date'},
    {title: 'По релевантности', value: 'relevance'},
    {title: 'По количеству просмотров', value: 'viewCount'}
  ]

  const dispatch = useDispatch()
  const {
    params: {q, maxResults, order, title, idx},
    favorites: {
      showSaveFavorites,
      searchStrDisabled,
      titleForm
    }
  } = useSelector(state => state.search)
  const {
    user: { id: userId }
  } = useSelector(state => state.auth)

  const [countResults, setCountResults] = useState(maxResults)

  useEffect(() => {
    setCountResults(maxResults)
    form.setFieldsValue({
      title,
      q,
      order,
      maxResults
    })
  }, [form, q, order, maxResults, title])

  const onChangeRangeHandler = value => {
    setCountResults(value)
    form.setFieldsValue({ maxResults: value })
  }

  const onCancelHandle = () => {
    dispatch(hideSaveFavorites())
  }

  const onOkHandle = () => {
    form.validateFields()
      .then(values => {
        if (titleForm === 'Сохранить запрос') {
          dispatch(saveFavorites(userId, values))
        } else {
          dispatch(saveFavoriteItem(userId, values, idx))
        }

        dispatch(toggleTooltip(true))
        setTimeout(() => {
          dispatch(toggleTooltip(false))
        }, 3000)
      })
  }

  return (
    <Modal
      title={titleForm}
      okText="Сохранить"
      cancelText="Не сохранять"
      visible={showSaveFavorites}
      className="favorite-modal"
      closable={false}
      onOk={onOkHandle}
      onCancel={onCancelHandle}
      forceRender
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          title,
          q,
          order,
          maxResults: +countResults
        }}
      >
        <Form.Item
          label="Запрос"
          name="q"
        >
          <Input disabled={searchStrDisabled} />
        </Form.Item>

        <Form.Item
          label="Название"
          name="title"
          rules={[{ required: true, message: 'Введите название' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Сортировать по"
          name="order"
        >
          <Select placeholder="Без сортировки">
            {
              orderOptions.map(item => (<Option value={item.value} key={item.value}>{item.title}</Option>))
            }
          </Select>
        </Form.Item>
        <Form.Item
          label="Максимальное количество"
          name="maxResults"
          style={{ margin: 0 }}
        >
          <Row>
            <Col flex="1 1 70%">
              <Slider
                min={1}
                max={50}
                onChange={onChangeRangeHandler}
                value={typeof countResults === 'number' ? countResults : 0}
              />
            </Col>
            <Col flex="1 1 5%">
              <InputNumber
                min={1}
                max={50}
                style={{ marginLeft: '15px' }}
                value={countResults}
                onChange={onChangeRangeHandler}
              />
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default FavoriteForm
