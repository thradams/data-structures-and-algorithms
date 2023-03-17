# Singly Linked List

### Intrusive

The object *book* knows he is used in a linked list because it has "next".

```c
struct book  {
  char title[10];
  struct book * next;
};

struct book_list {
  struct book * head,  *tail;
};
```

### Non intrusive

The object *book* does not knows he is used inside a linked list.

```c
struct book  {
  char title[10];
};

struct book_node {
  struct book * data;
  //or
  struct book data;
  struct book_node* next;
};

struct book_list {
  struct book_node * head,  *tail;
};
```



