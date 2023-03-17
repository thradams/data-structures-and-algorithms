# Singly Linked List


```c
struct book  {
  char title[10];
  struct book * next;
};

struct book_list {
  struct book * head,  *tail;
};
```

```c
struct book  {
  char title[10];
};

struct book_list_node {
  struct book data;
  struct book_list_node* next;
};

struct book_list {
  struct book_list_node * head,  *tail;
};
```


```c
struct book  {
  char title[10];
};

struct book_list_node {
  struct book* data;
  struct book_list_node* next;
};

struct book_list {
  struct book_list_node * head,  *tail;
};
```


